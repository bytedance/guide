import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { CloseSmall } from './Icons';
import {
  getArrowStyle,
  getHotSpotStyle,
  getModalStyle,
  getScrollContainer,
  getDocumentElement,
  getNodeName,
} from '../utils';
import { MARGIN } from '../constant/const';
import { IModal } from '../typings/guide';
import './index.less';

const PREFIX = 'guide-modal';

const Modal: React.FC<IModal> = ({
  anchorEl,
  parentEl,
  realWindow,
  steps,
  stepIndex,
  mask,
  arrow,
  hotspot,
  closable,
  onClose,
  onChange,
  stepText,
  nextText,
  okText,
  className,
  TEXT,
}) => {
  const stepInfo = steps[stepIndex];

  const visible = Object.prototype.hasOwnProperty.call(stepInfo, 'visible')
    ? stepInfo.visible
    : true;

  const modalRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>(0);

  /* The ref to the currently focused element */
  const focusedElRef = useRef<HTMLElement | null>(null);

  /* the index of the focused element in the NodeList `focusableEls` */
  const focusedIdxRef = useRef<number>(0);

  const [modalStyle, setModalStyle] = useState({});
  const [arrowStyle, setArrowStyle] = useState({});
  const [hotspotStyle, setHotspotStyle] = useState({});

  const scrollContainer = useMemo(() => getScrollContainer(anchorEl), [
    anchorEl,
  ]);

  const _okText =
    stepIndex !== steps.length - 1
      ? nextText || TEXT('NEXT_STEP')
      : okText || TEXT('I_KNOW');

  const _stepText =
    stepText || (TEXT('STEP_NUMBER') as (idx: number, len: number) => string);

  const calculateStyle = (): void => {
    const { placement, offset } = stepInfo;

    const modalEl = modalRef.current;

    if (!modalEl) return;

    const modalStyle = getModalStyle(
      modalEl,
      anchorEl,
      parentEl,
      scrollContainer,
      placement,
      offset,
    );
    const arrowStyle = getArrowStyle(modalEl, placement, mask);
    const hotspotStyle = getHotSpotStyle(
      placement,
      arrowStyle as Record<string, number>,
    );

    setModalStyle(modalStyle);
    setArrowStyle(arrowStyle);
    setHotspotStyle(hotspotStyle);
  };

  const handleChange = (): void => {
    stepInfo.beforeStepChange?.(stepInfo, stepIndex, steps);
    onChange();
  };

  const handleScroll = (): void => {
    const modalEl = modalRef.current;
    const anchorPos = anchorEl.getBoundingClientRect();
    const modalPos = (modalEl as Element).getBoundingClientRect();
    const scrollPos = scrollContainer.getBoundingClientRect();

    const isScrollContainerHtml = getNodeName(scrollContainer) === 'html';

    /* scroll the scroll container to show the modal */
    const visibleHeight = (scrollContainer as HTMLElement).clientHeight;
    const scrollContainerTop = isScrollContainerHtml ? 0 : scrollPos.top;
    if (
      // Modal is below the viewport
      anchorPos.top -
        scrollContainerTop +
        anchorPos.height +
        modalPos.height +
        MARGIN >=
        visibleHeight ||
      // Modal is above the viewport
      anchorPos.top <= modalPos.height + MARGIN
    ) {
      // scrolls to a particular set of coordinates inside a given element.
      scrollContainer.scrollTo({
        left: 0,
        top:
          scrollContainer.scrollTop +
          anchorPos.top -
          scrollContainerTop +
          anchorPos.height / 2 -
          visibleHeight / 2 +
          MARGIN,
        behavior: 'smooth',
      });
    }

    if (getNodeName(scrollContainer) === 'html') return;

    const documentEl = getDocumentElement(anchorEl);
    /* scroll to show the scroll container */
    if (
      // Modal is below the viewport
      scrollPos.top + scrollPos.height >= window.innerHeight ||
      // Modal is above the viewport
      scrollPos.bottom > scrollPos.height
    ) {
      // scrolls to a particular set of coordinates inside a given element.
      documentEl.scrollTo({
        left: 0,
        top:
          documentEl.scrollTop +
          scrollPos.top +
          scrollPos.height / 2 -
          window.innerHeight / 2 +
          MARGIN,
        behavior: 'smooth',
      });
    }
  };

  const handleResize = (): void => {
    if (timerRef.current) realWindow.cancelAnimationFrame(timerRef.current);
    timerRef.current = realWindow.requestAnimationFrame(() => {
      calculateStyle();
    });
  };

  const handleKeydown = (e: KeyboardEvent | { keyCode: number }): void => {
    const focusableEls: NodeListOf<HTMLElement> | null =
      modalRef.current?.querySelectorAll(
        '.guide-modal-title, .guide-modal-content, .guide-modal-footer-text, .guide-modal-footer-btn',
      ) || null;

    if (e.keyCode !== 9 || !focusableEls) return;

    (e as KeyboardEvent)?.preventDefault?.();

    const idx = focusedIdxRef.current;
    const len = focusableEls.length;
    const ele = focusableEls[idx];

    focusedElRef.current?.blur();
    ele.focus();
    focusedElRef.current = ele;

    if (idx === len - 1 && !(e as KeyboardEvent).shiftKey) {
      focusedIdxRef.current = 0;
    } else if (idx === 0 && (e as KeyboardEvent).shiftKey) {
      focusedIdxRef.current = len - 1;
    } else if ((e as KeyboardEvent).shiftKey) {
      focusedIdxRef.current--;
    } else {
      focusedIdxRef.current++;
    }
  };

  useEffect((): void | (() => void) => {
    if (stepInfo.skip) {
      onChange();
    } else if (visible) {
      focusedIdxRef.current = 0;

      handleScroll();
      handleKeydown({ keyCode: 9 });
      calculateStyle();

      realWindow.addEventListener('resize', handleResize);
      realWindow.addEventListener('keydown', handleKeydown);

      return () => {
        realWindow.removeEventListener('resize', handleResize);
        realWindow.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [visible, stepInfo, anchorEl]);

  return visible
    ? ReactDOM.createPortal(
        <div
          ref={modalRef}
          className={`${PREFIX} ${className}`}
          style={modalStyle}
        >
          {/* ARROW */}
          {arrow && <span className={`${PREFIX}-arrow`} style={arrowStyle} />}
          {/* HOT SPOT */}
          {hotspot && (
            <div className={`${PREFIX}-hotspot`} style={hotspotStyle} />
          )}
          {/* CLOSE BUTTON */}
          {closable && (
            <CloseSmall className={`${PREFIX}-close-icon`} onClick={onClose} />
          )}
          {/* MODAL TITLE */}
          <title className={`${PREFIX}-title`}>{stepInfo.title}</title>
          {/* MODAL CONTENT */}
          <div className={`${PREFIX}-content`}>
            {typeof stepInfo.content === 'function'
              ? stepInfo.content()
              : stepInfo.content}
          </div>
          {/* MODAL FOOTER */}
          <div className={`${PREFIX}-footer`}>
            <span className={`${PREFIX}-footer-text`}>
              {_stepText(stepIndex + 1, steps.length)}
            </span>
            <button className={`${PREFIX}-footer-btn`} onClick={handleChange}>
              {_okText}
            </button>
          </div>
        </div>,
        parentEl,
      )
    : null;
};

export default Modal;

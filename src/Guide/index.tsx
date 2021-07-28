import React, { useState, useMemo, useEffect } from 'react';
import {
  getOffsetParent,
  getDocument,
  getDocumentElement,
  getWindow,
  getAnchorEl,
  getCusAnchorEl,
} from '../utils';
import i18n from '../constant/lang';
import Mask from '../Mask';
import Modal from '../Modal';
import { IGuide } from '../typings/guide';
import { CUSTOM_ELEMENT_CLASS } from '../constant/className'

const Guide: React.FC<IGuide> = (props) => {
  const {
    steps,
    localKey,
    mask = true,
    arrow = true,
    hotspot = false,
    closable = true,
    modalClassName = '',
    maskClassName = '',
    expireDate = '',
    step = 0,
    beforeStepChange,
    afterStepChange,
    onClose,
    stepText,
    nextText,
    okText,
    lang = 'zh',
  } = props;

  const [stepIndex, setStepIndex] = useState<number>(-1);

  /* store the initial overflow value of the document */
  const [initOverflowVal, setInitOverflowVal] = useState<string>('');

  /* used to trigger a calculation of anchorEl */
  const [ticker, setTicker] = useState<number>(0);

  const i18nTEXT = useMemo(() => i18n(lang), [lang]);

  const visible = Object.prototype.hasOwnProperty.call(props, 'visible')
    ? props.visible
    : true;

  const anchorEl = useMemo(() => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      const { targetPos, selector } = steps[stepIndex]

      if (selector) return getAnchorEl(selector)

      if (targetPos) {
        return getCusAnchorEl(targetPos)
      }
    }
    return null;
  }, [stepIndex, steps[stepIndex], ticker]);

  const parentEl = useMemo(
    () =>
      anchorEl
        ? steps[stepIndex].parent === 'body' || mask
          ? getDocument(anchorEl).body
          : getOffsetParent(anchorEl)
        : null,
    [anchorEl],
  );

  /* To cater the cases of using iframe where the anchorEl
   * is not in the same window scope as the code running
   */
  const realWindow = useMemo(() => (anchorEl ? getWindow(anchorEl) : null), [
    anchorEl,
  ]);

  const realDocument = useMemo(
    () => (anchorEl ? getDocumentElement(anchorEl as Element) : null),
    [anchorEl],
  );

  const handleChange = (): void => {
    if (stepIndex === steps.length - 1) handleClose();
    else if (stepIndex >= 0) beforeStepChange?.(stepIndex, steps[stepIndex]);
    setStepIndex(stepIndex + 1);
  };

  const handleClose = (): void => {
    /* If the mask is displayed, the document's overflow value would have been set to `hidden`.
     * It should be recovered to its initial value as saved by initOverflowVal
     */
    if (mask) {
      (realDocument as HTMLElement).style.overflow = initOverflowVal;
    }

    const cusAnchor = document.querySelector(CUSTOM_ELEMENT_CLASS)
    if (cusAnchor) {
      document.body.removeChild(cusAnchor)
    }

    setStepIndex(-1);

    onClose?.();
    if (localKey) localStorage.setItem(localKey, 'true');
  };

  // skip the guide when click the escape key;
  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && (closable || stepIndex === steps.length - 1)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (visible) {
      const haveShownGuide = localKey ? localStorage.getItem(localKey) : false;
      const expireDateParse = new Date(
        Date.parse(expireDate.replace(/-/g, '/')),
      );
      if (!haveShownGuide && (!expireDate || new Date() <= expireDateParse)) {
        setStepIndex(step);
      }
    } else {
      setStepIndex(-1);
    }
  }, [visible, step]);

  useEffect((): (() => void) | void => {
    if (realWindow && realDocument) {
      realWindow.addEventListener('keydown', handleKeydown as EventListener);

      return () => {
        realWindow.removeEventListener(
          'keydown',
          handleKeydown as EventListener,
        );
      };
    }
  }, [realWindow, realDocument]);

  useEffect(() => {
    if (stepIndex >= 0) {
      afterStepChange?.(stepIndex, steps[stepIndex]);
    }
  }, [stepIndex]);

  useEffect(() => {
    if (mask && realDocument) {
      const curOverflow = realDocument.style.overflow;
      setInitOverflowVal(curOverflow || 'scroll');
    }
  }, [mask, realDocument]);

  useEffect((): void | (() => void) => {
    if (stepIndex >= 0) {
      const config = {
        childList: true,
        subtree: true,
      };
      const observer = new MutationObserver(() => {
        setTicker(ticker + 1);
      });

      observer.observe(document, config);

      return () => {
        observer.disconnect();
      };
    }
  }, [stepIndex, ticker]);

  return (!mask || initOverflowVal) && parentEl ? (
    <>
      {mask && (
        <Mask
          className={maskClassName}
          anchorEl={anchorEl as Element}
          realWindow={realWindow as Window}
        />
      )}
      <Modal
        anchorEl={anchorEl as HTMLElement}
        parentEl={parentEl as HTMLElement}
        realWindow={realWindow as Window}
        steps={steps}
        stepIndex={stepIndex}
        mask={mask}
        arrow={arrow}
        hotspot={hotspot}
        closable={closable}
        onClose={handleClose}
        onChange={handleChange}
        stepText={stepText}
        nextText={nextText}
        okText={okText}
        className={modalClassName}
        TEXT={i18nTEXT}
      />
    </>
  ) : null;
};

export default Guide;

import { ITargetPos } from '../typings/guide';

/**
 * Get the anchor element where the modal should be attached to.
 * @param selector - The CSS selector of the anchor element, or the anchor element itself.
 */
export const getCusAnchorEl = (targetPos: ITargetPos): Element => {
  const {top, left, width, height} = targetPos

  const preCusAnchor = document.querySelector('.custom-anchor')
  preCusAnchor && document.body.removeChild(preCusAnchor)

  const cusAnchor:HTMLElement = document.createElement('div')

  cusAnchor.className = 'custom-anchor'
  cusAnchor.style.cssText = `
    position: absolute; 
    top: ${top}px;
    left: ${left}px;
    width: ${width}px;
    height: ${height}px;
    pointer-events: none;
    opacity: 0;
  `
  document.body.appendChild(cusAnchor)
  return cusAnchor
};

import { ITargetPos } from '../typings/guide';
import { CUSTOM_ELEMENT_CLASS } from '../constant/className'

/**
 * Get the anchor element where the modal should be attached to.
 * @param selector - The CSS selector of the anchor element, or the anchor element itself.
 */
export const getCusAnchorEl = (targetPos: ITargetPos): Element => {

  const preCusAnchor = document.querySelector(CUSTOM_ELEMENT_CLASS)
  preCusAnchor && document.body.removeChild(preCusAnchor)

  const cusAnchor: HTMLDivElement = document.createElement('div')

  cusAnchor.className = CUSTOM_ELEMENT_CLASS
  Object.entries(targetPos).forEach(([key, value]: [any, number]) => {
    cusAnchor.style[key] = value + 'px'
  })

  document.body.appendChild(cusAnchor)
  return cusAnchor
};

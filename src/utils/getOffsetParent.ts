import {
  getWindow,
  getParentNode,
  getComputedStyle,
  getNodeName,
  isHTMLElement,
  isTableElement,
} from './utils';

/** Get the containing block for fixed positioned element as they don't have offsetParent */
export const getContainingBlock = (
  node: Element,
  callback?: (node: Element | null) => unknown,
): (Node & ParentNode) | null => {
  callback?.(node);
  let currentNode = getParentNode(node);

  while (
    isHTMLElement(currentNode as Element) &&
    ['html', 'body'].indexOf(getNodeName(currentNode as Element)) < 0
  ) {
    callback?.(currentNode as Element);
    const css = getComputedStyle(currentNode as Element);

    /**
     * If the position property is absolute or fixed,
     * the containing block may also be formed by the
     * edge of the padding box of the nearest ancestor
     * element that has the following:
     */
    if (
      css.transform !== 'none' ||
      css.perspective !== 'none' ||
      (css.willChange && css.willChange !== 'auto')
    ) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode as Element);
  }

  return currentNode;
};

export const getTrueOffsetParent = (node: HTMLElement): Element | null => {
  if (!isHTMLElement(node) || getComputedStyle(node).position === 'fixed') {
    return null;
  }

  /**
   *  If there is no positioned ancestor element, the nearest ancestor td, th,
   *  table will be returned, or the body if there are no ancestor table elements either.
   */
  return node.offsetParent;
};

/**
 * Gets the closest ancestor positioned element.
 * Handles some edge cases, such as table ancestors and cross browser bugs.
 */
export const getOffsetParent = (
  node: Element | HTMLElement,
  callback?: (node: Element | null) => unknown,
): Element | (Node & ParentNode) | (Window & typeof globalThis) | null => {
  const window = getWindow(node);

  callback?.(node);
  let offsetParent = getTrueOffsetParent(node as HTMLElement);

  /* A Table element cannot be used as an offset parent,
   * as a <div> cannot appear as a child of <table>.
   */
  while (
    offsetParent &&
    isTableElement(offsetParent) &&
    getComputedStyle(offsetParent).position === 'static'
  ) {
    callback?.(offsetParent);
    offsetParent = getTrueOffsetParent(offsetParent as HTMLElement);
  }

  return offsetParent || getContainingBlock(node, callback) || window;
};

export const getOffsetTop = (node: Element | HTMLElement): number => {
  let offsetTop = 0;

  getOffsetParent(node, (node) => {
    offsetTop += (node as HTMLElement).offsetTop;
  });

  return offsetTop;
};

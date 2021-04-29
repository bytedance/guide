/**
 * Get the window object using this function rather then simply use `window` because
 * there are cases where the window object we are seeking to reference is not in
 * the same window scope as the code we are running. (https://stackoverflow.com/a/37638629)
 */
export const getWindow = (
  node: Element,
): Element | (Window & typeof globalThis) => {
  // if node is not the window object
  if (node.toString() !== '[object Window]') {
    // get the top-level document object of the node, or null if node is a document.
    const { ownerDocument } = node;
    // get the window object associated with the document, or null if none is available.
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
};

export const getDocument = (node: Node | Window | Element): Document =>
  (isElement(node as Element)
    ? (node as Node).ownerDocument
    : (node as Window).document) || window.document;

/* Get the Element that is the root element of the document which contains the node
 * (for example, the <html> element for HTML documents).
 */
export const getDocumentElement = (node: Element): HTMLElement =>
  getDocument(node).documentElement;

/* Get node's style info */
export const getComputedStyle = (node: Element): CSSStyleDeclaration =>
  (getWindow(node) as Window & typeof globalThis).getComputedStyle(node);

/* Get node's node name */
export const getNodeName = (node: Element | null): string =>
  node ? (node.nodeName || '').toLowerCase() : '';

export const getParentNode = (
  node: Element | null,
): (Node & ParentNode) | null => {
  if (!node || getNodeName(node) === 'html') {
    return node;
  }

  return (
    // If node is rooted at a custom element, meaning the node is part of a shadow DOM
    node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    node.parentNode || // DOM Element detected
    node.host || // ShadowRoot detected
    getDocumentElement(node) // fallback
  );
};

/* Check if node is an Element or a customized Element */
export const isElement = (node: Element): boolean => {
  const OwnElement = (getWindow(node) as Window & typeof globalThis).Element;
  return node instanceof OwnElement || (node as unknown) instanceof Element;
};

/* Check if node is an HTMLElement or a customized HTMLElement */
export const isHTMLElement = (node: Element): boolean => {
  const OwnElement = (getWindow(node) as Window & typeof globalThis)
    .HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
};

// Check if node is an HTMLElement or a customized HTMLElement
export const isTableElement = (node: Element): boolean =>
  ['table', 'td', 'th'].indexOf(getNodeName(node)) >= 0;

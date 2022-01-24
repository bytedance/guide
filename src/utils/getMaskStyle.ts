import { getDocumentElement } from './utils';

export const getMaskStyle = (anchorEl: Element): Record<string, number> => {
  const scrollContainer = getDocumentElement(anchorEl);

  const { clientWidth, clientHeight, scrollTop } = scrollContainer;

  // prevent scrolling
  scrollContainer.style.overflow = 'hidden';

  const anchorPos = anchorEl.getBoundingClientRect();
  const { height, width, left } = anchorPos;

  const top = anchorPos.top + scrollTop;

  return {
    width: clientWidth,
    height: clientHeight,
    borderTopWidth: Math.max(top, 0),
    borderBottomWidth: Math.max(clientHeight - height - top, 0),
    borderRightWidth: Math.max(clientWidth - width - left, 0),
    borderLeftWidth: Math.max(left, 0),
  };
};

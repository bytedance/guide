import { getDocumentElement } from './utils';

export const getMaskStyle = (anchorEl: Element): Record<string, number> => {
  const scrollContainer = getDocumentElement(anchorEl);

  const { scrollWidth, scrollHeight, scrollTop } = scrollContainer;

  // prevent scrolling
  scrollContainer.style.overflow = 'hidden';

  const anchorPos = anchorEl.getBoundingClientRect();
  const { height, width, left } = anchorPos;

  const top = anchorPos.top + scrollTop;

  return {
    width: scrollWidth,
    height: scrollHeight,
    borderTopWidth: Math.max(top, 0),
    borderBottomWidth: Math.max(scrollHeight - height - top, 0),
    borderRightWidth: Math.max(scrollWidth - width - left, 0),
    borderLeftWidth: Math.max(left, 0),
  };
};

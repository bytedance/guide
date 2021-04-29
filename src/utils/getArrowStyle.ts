import { getReversePosition } from './getReversePosition';
import { Placement } from '../typings/guide';

type SinglePlacement = 'top' | 'bottom' | 'left' | 'right';

export const getArrowStyle = (
  modalEl: Element,
  placement: Placement = 'bottom',
  mask = false,
  margin = 12,
): Record<string, string | number> => {
  const modalPos = modalEl.getBoundingClientRect();
  const diagonalWidth = 10;

  const [firstPlacement, lastPlacement] = placement.split(
    '-',
  ) as SinglePlacement[];

  const boxShadowmMap = {
    top: '1px 1px 1px 0px #ccc',
    right: '-1px 1px 1px 0px #ccc',
    bottom: '-1px -1px 1px 0px #ccc',
    left: '1px -1px 1px 0px #ccc',
  };

  const extraStyle = {
    boxShadow: mask ? 'none' : boxShadowmMap[firstPlacement],
    [getReversePosition(firstPlacement)]: -diagonalWidth / 2,
  };

  if (!lastPlacement) {
    const style: { [key: string]: any } = {};
    if (['bottom', 'top'].includes(firstPlacement)) {
      style['right'] = (modalPos.width - diagonalWidth) / 2;
    }
    if (['left', 'right'].includes(firstPlacement)) {
      style['top'] = (modalPos.height - diagonalWidth) / 2;
    }
    return {
      ...style,
      ...extraStyle,
    };
  } else {
    return {
      [lastPlacement]: margin * 2,
      ...extraStyle,
    };
  }
};

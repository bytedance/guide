import { getReversePosition } from './getReversePosition';
import { SinglePlacement, Placement } from '../typings/guide';

export const getHotSpotStyle = (
  placement: Placement = 'bottom',
  arrowStyle: Record<SinglePlacement, number>,
): Record<string, number> => {
  const [firstPlacement, lastPlacement] = placement.split('-');
  const reversePlacement: SinglePlacement = getReversePosition(
    firstPlacement as SinglePlacement,
  );
  const diagonalWidth = 24;

  if (['top', 'bottom'].includes(firstPlacement)) {
    if (!lastPlacement || lastPlacement === 'right') {
      return {
        [reversePlacement]: arrowStyle[reversePlacement] - diagonalWidth,
        right: arrowStyle.right - 3,
      };
    }
    return {
      [reversePlacement]: arrowStyle[reversePlacement] - diagonalWidth,
      left: arrowStyle.left - 3,
    };
  }

  if (['right', 'left'].includes(firstPlacement)) {
    if (!lastPlacement || lastPlacement === 'top') {
      return {
        top: arrowStyle.top - 3,
        [reversePlacement]: arrowStyle[reversePlacement] - diagonalWidth,
      };
    }
    return {
      bottom: arrowStyle.bottom - 3,
      [reversePlacement]: arrowStyle[reversePlacement] - diagonalWidth,
    };
  }

  return arrowStyle;
};

export const placements = [
  {
    title: 'placement: top',
    content: 'place the modal on top of the content',
    placement: 'top',
    selector: '#top',
  },
  {
    title: 'placement: left',
    content: 'place the modal to the left of the content',
    placement: 'left',
    selector: '#left',
  },
  {
    title: 'placement: bottom',
    content: 'place the modal below the bottom of the content',
    placement: 'bottom',
    selector: '#bottom',
  },
  {
    title: 'placement: right',
    content: 'place the modal to the right of the content',
    placement: 'right',
    selector: '#right',
  },
  {
    title: 'placement: top-right',
    content:
      'Place the modal such that its bottom-border attaches to the top-border of the content，with their right-borders align.',
    placement: 'top-right',
    selector: '#top-right',
  },
  {
    title: 'placement: top-left',
    content:
      'Place the modal such that its bottom-border attaches to the top-border of the content，with their left-borders align',
    placement: 'top-left',
    selector: '#top-left',
  },
  {
    title: 'placement: bottom-right',
    content:
      'Place the modal such that its top-border attaches to the bottom-border of the content，with their right-borders align.',
    placement: 'bottom-right',
    selector: '#bottom-right',
  },
  {
    title: 'placement: bottom-left',
    content:
      'Place the modal such that its top-border attaches to the bottom-border of the content，with their left-borders align.',
    placement: 'bottom-left',
    selector: '#bottom-left',
  },
  {
    title: 'placement: right-top',
    content:
      'Place the modal such that its left-border attaches to the right-border of the content，with their top-borders align.',
    placement: 'right-top',
    selector: '#right-top',
  },
  {
    title: 'placement: left-top',
    content:
      'Place the modal such that its right-border attaches to the left-border of the content，with their top-borders align.',
    placement: 'left-top',
    selector: '#left-top',
  },
  {
    title: 'placement: right-bottom',
    content:
      'Place the modal such that its left-border attaches to the right-border of the content，with their bottom-borders align.',
    placement: 'right-bottom',
    selector: '#right-bottom',
  },
  {
    title: 'placement: left-bottom',
    content:
      'Place the modal such that its right-border attaches to the left-border of the content，with their bottom-borders align.',
    placement: 'left-bottom',
    selector: '#left-bottom',
  },
];

export const placementsCn = [
  {
    title: 'placement: top',
    content: 'modal放到内容的上面',
    placement: 'top',
    selector: '#top',
  },
  {
    title: 'placement: left',
    content: 'modal放到内容的左边',
    placement: 'left',
    selector: '#left',
  },
  {
    title: 'placement: bottom',
    content: 'modal放到内容的下面',
    placement: 'bottom',
    selector: '#bottom',
  },
  {
    title: 'placement: right',
    content: 'modal放到内容的右边',
    placement: 'right',
    selector: '#right',
  },
  {
    title: 'placement: top-right',
    content: 'modal的bottom-border紧贴内容的top-border，right-borders水平对齐',
    placement: 'top-right',
    selector: '#top-right',
  },
  {
    title: 'placement: top-left',
    content: 'modal的bottom-border紧贴内容的top-border，left-borders水平对齐',
    placement: 'top-left',
    selector: '#top-left',
  },
  {
    title: 'placement: bottom-right',
    content: 'modal的top-border紧贴内容的bottom-border，right-borders水平对齐',
    placement: 'bottom-right',
    selector: '#bottom-right',
  },
  {
    title: 'placement: bottom-left',
    content: 'modal的top-border紧贴内容的bottom-border，left-borders水平对齐',
    placement: 'bottom-left',
    selector: '#bottom-left',
  },
  {
    title: 'placement: right-top',
    content: 'modal的left-border紧贴内容的right-border，top-borders水平对齐',
    placement: 'right-top',
    selector: '#right-top',
  },
  {
    title: 'placement: left-top',
    content: 'modal的right-border紧贴内容的left-border，top-borders水平对齐',
    placement: 'left-top',
    selector: '#left-top',
  },
  {
    title: 'placement: right-bottom',
    content: 'modal的left-border紧贴内容的right-border，bottom-borders水平对齐',
    placement: 'right-bottom',
    selector: '#right-bottom',
  },
  {
    title: 'placement: left-bottom',
    content: 'modal的right-border紧贴内容的left-border，bottom-borders水平对齐',
    placement: 'left-bottom',
    selector: '#left-bottom',
  },
];

export const STEPS = placements.map(
  ({ title, content, placement, selector }) => ({
    selector,
    title,
    content,
    placement,
  }),
);

export const STEPS_CN = placementsCn.map(
  ({ title, content, placement, selector }) => ({
    selector,
    title,
    content,
    placement,
  }),
);

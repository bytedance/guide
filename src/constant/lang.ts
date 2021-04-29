const LANGUAGES = {
  NEXT_STEP: {
    zh: '下一步',
    en: 'Next step',
    ja: '次のステップ',
  },
  I_KNOW: {
    zh: '我知道了',
    en: 'I know',
    ja: '知ってる',
  },
  STEP_NUMBER: {
    zh: (idx: number, length: number) => `第${idx}步， 共${length}步`,
    en: (idx: number, length: number) => `Step ${idx} of ${length}`,
    ja: (idx: number, length: number) => `Step ${idx} of ${length}`,
  },
};

type languages = typeof LANGUAGES;
type langType = 'zh' | 'en' | 'ja';
export type StepNumber = (idx: number, length: number) => string;

export default function i18n(
  lang: langType = 'zh',
): (key: keyof languages) => string | StepNumber {
  return (key: keyof languages): string | StepNumber => {
    return LANGUAGES[key]?.[lang];
  };
}

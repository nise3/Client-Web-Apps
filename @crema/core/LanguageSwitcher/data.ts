export interface LanguageProps {
  languageId: string;
  locale: string;
  name: string;
  icon: string;
}

const languageData: LanguageProps[] = [
  {
    languageId: 'bangla',
    locale: 'bn',
    name: 'BN',
    icon: 'bd',
  },
  {
    languageId: 'english',
    locale: 'en',
    name: 'EN',
    icon: 'us',
  },
  // {
  //   languageId: 'chinese',
  //   locale: 'zh',
  //   name: 'Chinese',
  //   icon: 'cn',
  // },
  // {
  //   languageId: 'spanish',
  //   locale: 'es',
  //   name: 'Spanish',
  //   icon: 'es',
  // },
  // {
  //   languageId: 'french',
  //   locale: 'fr',
  //   name: 'French',
  //   icon: 'fr',
  // },
  // {
  //   languageId: 'italian',
  //   locale: 'it',
  //   name: 'Italian',
  //   icon: 'it',
  // },
  // {
  //   languageId: 'saudi-arabia',
  //   locale: 'ar',
  //   name: 'Arabic',
  //   icon: 'sa',
  // },
];
export default languageData;

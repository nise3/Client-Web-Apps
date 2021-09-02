const ERRORS: any = {
  61000: 'common.validation_exist_error',
  49000: 'common.validation_exist_error',
};

const getValidationMessage = (code: string) => {
  // const messages = defineMessages(bnMessages);
  // let locale = 'bn-BD';
  // const {intl} = new IntlProvider({locale, messages}).getChildContext();
  // console.log(intl.formatMessage({id: 'common.validation_exist_error'}));
  return ERRORS[code];
};

export const setServerValidationErrors = (errors: any, setError: any) => {
  return Object.keys(errors).forEach((key) => {
    errors[key].forEach(({code}: any) =>
      setError(key, {
        type: code,
        message: getValidationMessage(code),
      }),
    );
  });
};

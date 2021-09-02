import {createIntl} from 'react-intl';

const intl: any = createIntl({
  locale: 'bn-BD',
  messages: {},
});

const ERRORS: any = {
  61000: 'common.validation_exist_error',
  49000: 'common.validation_exist_error',
};

const getValidationMessage = (code: string) => {
  console.log(
    'intl',
    intl.message({
      id: 'common.validation_exist_error',
    }),
  );
  return intl.messages[ERRORS[code]] as string;
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

const ERRORS: any = {
  61000: 'common.validation_exist_error',
  49000: 'yup_validation_required_field',
  45000: 'common.validation_number_error',
  46000: 'common.validation_password_error',
  48000: 'common.validation_regex_error',
  22000: 'yup_validation_email',
};

export const setServerValidationErrors = (errors: any, setError: any) => {
  return Object.keys(errors).forEach((key) => {
    errors[key].forEach(({code}: any) => {
      console.log(
        'ERRORS[code]',
        ERRORS[code]
          ? {key: ERRORS[code], values: {path: key}}
          : {key: 'yup_validation_unknown_error'},
      );
      setError(key, {
        type: code,
        message: ERRORS[code]
          ? {key: ERRORS[code], values: {path: key}}
          : {key: 'yup_validation_unknown_error'},
      });
    });
  });
};

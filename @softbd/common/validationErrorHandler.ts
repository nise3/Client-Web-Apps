const ERRORS: any = {
  61000: 'common.validation_exist_error',
  49000: 'common.validation_required_error',
  45000: 'common.validation_number_error',
  46000: 'common.validation_password_error',
  48000: 'common.validation_regex_error',
  22000: 'common.validation_email_error',
};

export const setServerValidationErrors = (errors: any, setError: any) => {
  return Object.keys(errors).forEach((key) => {
    errors[key].forEach(({code}: any) =>
      setError(key, {
        type: code,
        message: {key: ERRORS[code], values: {path: key}},
      }),
    );
  });
};

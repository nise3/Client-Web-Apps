const ERRORS: any = {
  61000: 'yup_validation_exist',
  49000: 'yup_validation_required_field',
  45000: 'yup_validation_number',
  46000: 'yup_validation_password',
  48000: 'yup_validation_regex',
  22000: 'yup_validation_email',
  39003: 'yup_validation_text_length',
};

export const setServerValidationErrors = (
  errors: any,
  setError: any,
  validationSchema?: any,
) => {
  return Object.keys(errors).forEach((key) => {
    errors[key].forEach(({code}: any) => {
      let label = validationSchema?.fields[key]?.spec?.label;
      setError(key, {
        type: code,
        message: ERRORS[code]
          ? {key: ERRORS[code], values: {path: label ? label : key}}
          : {key: 'yup_validation_unknown_error'},
      });
    });
  });
};

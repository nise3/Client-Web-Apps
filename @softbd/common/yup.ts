import * as yup from 'yup';

// declare module 'yup' {
//   interface StringSchema<TIn, TContext, TOut> {
//     title(local: 'en' | 'bn'): any;
//   }
// }

yup.setLocale({
  mixed: {
    default: '${path} is invalid',
    required: ({path}: any) => ({key: 'required_field', values: {path}}),
    oneOf: '${path} must be one of the following values: ${values}',
    notOneOf: '${path} must not be one of the following values: ${values}',
    notType: 'not_type',
    defined: '${path} must be defined',
  },
  string: {
    length: '${path} must be exactly ${length} characters',
    min: '${path} must be at least ${min} characters',
    max: '${path} must be at most ${max} characters',
    matches: '${path} must match the following: "${regex}"',
    email: '${path} must be a valid email',
    url: '${path} must be a valid URL',
    uuid: '${path} must be a valid UUID',
    trim: '${path} must be a trimmed string',
    lowercase: '${path} must be a lowercase string',
    uppercase: '${path} must be a upper case string',
  },
  number: {
    min: '${path} must be greater than or equal to ${min}',
    max: '${path} must be less than or equal to ${max}',
    lessThan: '${path} must be less than ${less}',
    moreThan: '${path} must be greater than ${more}',
    positive: '${path} must be a positive number',
    negative: '${path} must be a negative number',
    integer: '${path} must be an integer',
  },
  date: {
    min: '${path} field must be later than ${min}',
    max: '${path} field must be at earlier than ${max}',
  },
  boolean: {
    isValue: '${path} field must be ${value}',
  },
  object: {
    noUnknown: '${path} field has unspecified keys: ${unknown}',
  },
  array: {
    min: '${path} field must have at least ${min} items',
    max: '${path} field must have less than or equal to ${max} items',
    length: '${path} must have ${length} items',
  },
});

function defaultTitleValidation(this: any, local: 'en' | 'bn') {
  return this.string().trim().required();
}

yup.addMethod(yup.string, 'title', defaultTitleValidation);

export default yup;

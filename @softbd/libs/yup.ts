import * as yup from 'yup';
import {
  TEXT_REGEX_BANGLA_ONLY,
  TEXT_REGEX_ENGLISH_ONLY,
} from '../common/patternRegex';
import {AnyObject, Maybe} from 'yup/lib/types';
import {appIntl} from '../../@crema/utility/Utils';

yup.setLocale({
  mixed: {
    required: ({path}: any) => ({
      key: 'yup_validation_required_field',
      values: {path},
    }),
    default: ({path}: any) => ({key: 'yup_validation_default', values: {path}}),
    oneOf: ({path, values}: any) => ({
      key: 'yup_validation_one_Of',
      values: {path, values},
    }),
    notOneOf: ({path, values}: any) => ({
      key: 'yup_validation_not_one_of',
      values: {path, values},
    }),
    notType: 'not_type', //TODO: see packages example for real implementation.
    defined: ({path}: any) => ({key: 'yup_validation_defined', values: {path}}),
  },
  string: {
    length: ({path, length}: any) => ({
      key: 'yup_validation_length',
      values: {path, length},
    }),
    min: ({path, min}: any) => ({
      key: 'yup_validation_min',
      values: {path, min},
    }),
    max: ({path, max}: any) => ({
      key: 'yup_validation_max',
      values: {path, max},
    }),
    matches: ({path}: any) => ({
      key: 'yup_validation_matches',
      values: {path},
    }),
    email: ({path}: any) => ({key: 'yup_validation_email', values: {path}}),
    url: ({path}: any) => ({key: 'yup_validation_url', values: {path}}),
    uuid: ({path}: any) => ({key: 'yup_validation_uuid', values: {path}}),
    trim: ({path}: any) => ({key: 'yup_validation_trim', values: {path}}),
    lowercase: ({path}: any) => ({
      key: 'yup_validation_lowercase',
      values: {path},
    }),
    uppercase: ({path}: any) => ({
      key: 'yup_validation_uppercase',
      values: {path},
    }),
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
  console.log(appIntl());
  return this.trim()
    .required()
    .matches(local === 'bn' ? TEXT_REGEX_BANGLA_ONLY : TEXT_REGEX_ENGLISH_ONLY);
}

yup.addMethod<yup.StringSchema>(yup.string, 'title', defaultTitleValidation);

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    title(local: 'en' | 'bn'): StringSchema<TType, TContext>;
  }
}

export default yup;

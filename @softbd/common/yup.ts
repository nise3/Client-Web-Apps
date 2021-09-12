import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema<TIn, TContext, TOut> {
    title(local: 'en' | 'bn'): any;
  }
}

function defaultTitleValidation(this: any, local: 'en' | 'bn') {
  return this.string().trim().required();
}

yup.addMethod(yup.string, 'title', defaultTitleValidation);

export default yup;

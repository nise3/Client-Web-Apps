import {addDecorator} from '@storybook/react';
import {LocaleProvider} from '../@crema';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const Decorator = (story) => <LocaleProvider>{story()}</LocaleProvider>;
addDecorator((story) => Decorator(story));

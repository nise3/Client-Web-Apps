import {addDecorator} from '@storybook/react';
import {CremaThemeProvider, LocaleProvider} from '../@crema';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const Decorator = (story) => (
  <CremaThemeProvider>
    <LocaleProvider>{story()}</LocaleProvider>
  </CremaThemeProvider>
);

addDecorator((story) => Decorator(story));

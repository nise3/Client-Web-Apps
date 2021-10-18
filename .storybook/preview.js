import {addDecorator} from '@storybook/react';
import {
  CremaStyleProvider,
  CremaThemeProvider,
  LocaleProvider,
} from '../@crema';

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
    <CremaStyleProvider>
      <LocaleProvider>{story()}</LocaleProvider>
    </CremaStyleProvider>
  </CremaThemeProvider>
);

addDecorator((story) => Decorator(story));

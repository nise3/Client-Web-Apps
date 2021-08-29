import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import AddButton from './AddButton';

export default {
  title: 'Example/AddButton',
  component: AddButton,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AddButton>;

const Template: ComponentStory<typeof AddButton> = (args) => (
  <AddButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tooltip: 'Add new',
};

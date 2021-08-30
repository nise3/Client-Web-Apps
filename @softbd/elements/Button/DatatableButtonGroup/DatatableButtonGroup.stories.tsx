import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import DatatableButtonGroup from './DatatableButtonGroup';
import ReadButton from '../ReadButton';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';

export default {
  title: 'Example/DatatableButtonGroup',
  component: DatatableButtonGroup,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof DatatableButtonGroup>;

const Template: ComponentStory<typeof DatatableButtonGroup> = (args) => (
  <DatatableButtonGroup {...args} />
);

export const withChildren = Template.bind({});
withChildren.args = {
  children: (
    <>
      <ReadButton onClick={() => {}} />
      <EditButton onClick={() => {}} />
      <DeleteButton deleteAction={() => {}} deleteTitle='Are you sure?' />
    </>
  ),
};

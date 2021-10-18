import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import CourseCardComponent from './index';

export default {
  title: 'Example/CourseCardComponent',
  component: CourseCardComponent,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof CourseCardComponent>;

const Template: ComponentStory<typeof CourseCardComponent> = (args) => (
  <CourseCardComponent {...args} />
);

export const withData = Template.bind({});
withData.args = {
  course: {
    progress: '70',
    image:
      'https://image.shutterstock.com/image-photo/mountain-landscape-hiking-trail-view-260nw-1071252569.jpg',
    title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
    fee: '5,000',
    providerLogo:
      'https://image.shutterstock.com/image-photo/mountain-landscape-hiking-trail-view-260nw-1071252569.jpg',
    providerName: 'Diane Croenwett',
    createDate: 'Mar 19,2020',
    tags: ['2hr, 47 min', '24 lessons'],
  },
};

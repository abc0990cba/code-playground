import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyButton  from '../../MyButton/MyButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/MyButton',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MyButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MyButton> = (args) => <MyButton {...args} />;

export const BigButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BigButton.args = {
  big: true,
  color: "white"
};

export const RedButton = Template.bind({});
RedButton.args = {
  color: "red"
};



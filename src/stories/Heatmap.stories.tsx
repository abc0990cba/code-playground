import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeatMap  from '../../HeatMap';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/HeatMap',
  component: HeatMap,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HeatMap>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeatMap> = (args) => <HeatMap {...args} />;

export const BlueHeatMap = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BlueHeatMap.args = {
  big: true,
  color: "white"
};




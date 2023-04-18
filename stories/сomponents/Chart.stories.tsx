import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Chart from '../../components/Chart';

export default {
  title: 'Components/Chart',
  component: Chart,
  decorators: [
    (story) => (
      <div style={{
        height: '100vh',
        margin: 'auto',
      }}>
        { story() }
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) =>
  <Chart { ...args } />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { date: new Date(1982, 1, 1), value: 125, label: '+$125' },
    { date: new Date(1987, 1, 1), value: 257, label: '+$257' },
    { date: new Date(1993, 1, 1), value: 345, label: '+$345' },
    { date: new Date(1997, 1, 1), value: 515, label: '+$515' },
    { date: new Date(2001, 1, 1), value: 132, label: '+$132' },
    { date: new Date(2005, 1, 1), value: 305, label: '+$305' },
    { date: new Date(2011, 1, 1), value: 270, label: '+$270' },
    { date: new Date(2015, 1, 1), value: 470, label: '+$470' },
  ],
};

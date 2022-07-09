import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ width: '206px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    primary: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Top Up',
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Send',
};

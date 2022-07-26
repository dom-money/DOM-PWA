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

export const Default = Template.bind({});
Default.args = {
  label: 'Send',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Send',
  primary: true,
  disabled: true,
};

export const AsLink = Template.bind({});
AsLink.args = {
  label: 'Top Up',
  primary: true,
  asAnchor: true,
  href: '/',
};

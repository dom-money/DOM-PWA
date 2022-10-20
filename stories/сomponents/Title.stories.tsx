import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Title from '../../components/Title';

export default {
  title: 'Components/Title',
  component: Title,
  argTypes: {
    text: {
      type: { name: 'string', required: true },
      description: 'Text to display',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    as: {
      type: { name: 'string', required: false },
      // eslint-disable-next-line max-len
      description: 'Optionally render title as another HTML element (renders as h2 by default)',
      table: {
        defaultValue: {
          summary: 'undefined',
        },
        type: {
          summary: 'string',
        },
      },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Wallet',
};

export const AsParagraph = Template.bind({});
AsParagraph.args = {
  text: 'Wallet',
  as: 'p',
};

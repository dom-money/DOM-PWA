import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Title from '../../components/Title';

export default {
  title: 'Components/Title',
  component: Title,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    inputID: {
      if: { arg: 'as', eq: 'label' },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title { ...args } />;

export const Default = Template.bind({});
Default.args = {
  text: 'Wallet',
};

export const AsParagraph = Template.bind({});
AsParagraph.args = {
  text: 'Wallet',
  as: 'p',
};

export const AsLabel = Template.bind({});
AsLabel.args = {
  text: 'Amount Input',
  as: 'label',
  inputID: 'test-amount-input',
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GenericContainer from '../../components/GenericContainer';

export default {
  title: 'Components/Generic Container',
  component: GenericContainer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof GenericContainer>;

const SampleContent = () => {
  return (
    <h3 style={{ color: 'white', fontWeight: 500 }}>Sample Content</h3>
  );
};

const Template: ComponentStory<typeof GenericContainer> = (args) =>
  <GenericContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Your Address To Receive Funds',
  content: <SampleContent />,
};

export const AsInputContainer = Template.bind({});
AsInputContainer.args = {
  label: 'Enter Amount To Transfer',
  content: <SampleContent />,
  titleHtmlElement: 'label',
  inputID: 'default-input-id',
};

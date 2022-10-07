import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GenericContainer from '../../components/GenericContainer';

const SampleContent = () => {
  return (
    <h3 style={{ color: 'white', fontWeight: 500 }}>Sample Content</h3>
  );
};

export default {
  title: 'Components/Generic Container',
  component: GenericContainer,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof GenericContainer>;

const Template: ComponentStory<typeof GenericContainer> = (args) =>
  <GenericContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Your Address To Receive Funds',
  content: <SampleContent />,
};

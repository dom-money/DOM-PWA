import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import HeaderGoBack from '../../components/HeaderGoBack';

export default {
  title: 'Components/Header with \'go back\' button',
  component: HeaderGoBack,
  parameters: {
    layout: 'padded',
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    onClick: {
      type: { name: 'function', required: true },
      action: `'Go Back' Button Clicked`,
    },
    href: {
      type: { name: 'string', required: true },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (story) => (
      <div style={{
        padding: '2rem',
        backgroundColor: '#1F1F1F',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      }}>
        { story() }
      </div>
    ),
  ],
} as ComponentMeta<typeof HeaderGoBack>;

const Template: ComponentStory<typeof HeaderGoBack> = (args) =>
  <HeaderGoBack { ...args } />;

export const Default = Template.bind({});
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const goBackButton = canvas.getByRole('button');
  await userEvent.click(goBackButton);
  await waitFor(() => expect(args.onClick).toHaveBeenCalled());

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};
Default.parameters = {
  controls: {
    exclude: [
      'href',
    ],
  },
};

export const AsLink = Template.bind({});
AsLink.args = {
  href: '/',
};
AsLink.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const goBackButton = canvas.getByRole('link');

  await waitFor(() => expect(goBackButton).toHaveAttribute('href', '/'));
};
AsLink.parameters = {
  controls: {
    exclude: [
      'onClick',
    ],
  },
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Button from '../../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (story) => (
      <div style={{ width: '206px' }}>
        {story()}
      </div>
    ),
  ],
  argTypes: {
    primary: { control: 'boolean' },
    onClick: {
      action: 'Button Clicked',
    },
  },
} as ComponentMeta<typeof Button>;

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof Button>,
  canvasElement: HTMLElement
};

const playFn = async (
    { args, canvasElement }: PlayFnArgs,
    disabled?: boolean,
) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  await userEvent.click(button);

  if (disabled) {
    await waitFor(() => expect(args.onClick).not.toHaveBeenCalled());
  } else {
    await waitFor(() => expect(args.onClick).toHaveBeenCalled());
  };

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Top Up',
  primary: true,
};
Primary.play = playFn;

export const Default = Template.bind({});
Default.args = {
  label: 'Send',
};
Default.play = playFn;

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Send',
  primary: true,
  disabled: true,
};
Disabled.play = (args) => playFn(args, true);

export const AsLink = Template.bind({});
AsLink.args = {
  label: 'Top Up',
  primary: true,
  asAnchor: true,
  href: '/',
};
AsLink.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const avatarLinkButton = canvas.getByRole('link');

  await waitFor(() => expect(avatarLinkButton).toHaveAttribute('href', '/'));
};

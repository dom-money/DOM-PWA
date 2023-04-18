import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import AvatarButton from '../../components/AvatarButton';

export default {
  title: 'Components/Avatar Button',
  component: AvatarButton,
  argTypes: {
    onClick: {
      action: `'Avatar' Button Clicked`,
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof AvatarButton>;

const Template: ComponentStory<typeof AvatarButton> = (args) =>
  <AvatarButton {...args} />;

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof AvatarButton>,
  canvasElement: HTMLElement
}

const playFn = async ({ args, canvasElement }: PlayFnArgs) => {
  const canvas = within(canvasElement);
  const avatarButton = canvas.getByRole('button');
  await userEvent.click(avatarButton);

  await waitFor(() => expect(args.onClick).toHaveBeenCalled());

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

export const Image = Template.bind({});
Image.args = {
  imageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  userName: 'John Doe',
};
Image.play = playFn;

export const Text = Template.bind({});
Text.args = {
  userName: 'John Doe',
};
Text.play = playFn;

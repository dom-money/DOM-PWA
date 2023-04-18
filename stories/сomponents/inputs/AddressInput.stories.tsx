import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import AddressInput from '../../../components/AddressInput';

export default {
  title: 'Components/Inputs/Address Input',
  component: AddressInput,
  argTypes: {
    onValueChange: {
      action: `'On Value Change' Callback Called`,
    },
    onFocus: {
      action: `'On Focus' Callback Called`,
    },
    getContactOnClick: {
      action: `'Get Contact' Button Clicked`,
    },
    scanQROnClick: {
      action: `'Scan QR' Button Clicked`,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (story) => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        margin: '0 auto',
        maxWidth: 'min-content',
        height: '100vh',
      }}>
        { story() }
      </div>
    ),
  ],
} as ComponentMeta<typeof AddressInput>;

const Template: ComponentStory<typeof AddressInput> = (args) => {
  const [ { addressValue, onValueChange, onFocus }, updateArgs ] = useArgs();

  const handleValueChange = (addressValue: string) => {
    updateArgs({ addressValue: addressValue });
    onValueChange(addressValue);
  };

  const handleFocus = (prefill?: string) => {
    if (prefill) {
      updateArgs({ addressValue: prefill });
    };
    onFocus(prefill);
  };

  return <AddressInput
    { ...args }
    addressValue={ addressValue }
    onValueChange={ handleValueChange }
    onFocus={ handleFocus }
  />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Enter Or Choose Address',
  addressValue: '0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca',
  inputID: 'default-address-input',
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const getContactButton = canvas.getByRole('button', { name: 'Get Contact' });
  const scanQRButton = canvas.getByRole('button', { name: 'Scan QR' });

  await userEvent.click(getContactButton);
  await waitFor(() => expect(args.getContactOnClick).toHaveBeenCalled());

  await userEvent.click(scanQRButton);
  await waitFor(() => expect(args.scanQROnClick).toHaveBeenCalled());

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

export const WithPrefill = Template.bind({});
WithPrefill.args = {
  label: 'Enter Or Choose Address',
  addressValue: '',
  inputID: 'default-address-input',
  prefill: '0x',
};

export const Empty = Template.bind({});
Empty.args = {
  label: 'Enter Or Choose Address',
  addressValue: '',
  inputID: 'default-address-input',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Enter Or Choose Address',
  addressValue: '',
  inputID: 'default-address-input',
  disabled: true,
};
Disabled.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const getContactButton = canvas.getByRole('button', {
    name: 'Disabled "Get Contact" Button',
  });
  const scanQRButton = canvas.getByRole('button', {
    name: 'Disabled "Scan QR" Button',
  });

  await userEvent.click(getContactButton);
  await expect(getContactButton).toBeDisabled();
  await waitFor(() => expect(args.getContactOnClick).not.toHaveBeenCalled());

  await userEvent.click(scanQRButton);
  await expect(scanQRButton).toBeDisabled();
  await waitFor(() => expect(args.scanQROnClick).not.toHaveBeenCalled());

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

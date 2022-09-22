import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import AddressInput from '../../../components/AddressInput';

export default {
  title: 'Components/Inputs/Address Input',
  component: AddressInput,
  argTypes: {
    getContactOnClick: {
      action: `'Get Contact' Button Clicked`,
      table: {
        disable: true,
      },
    },
    scanQROnClick: {
      action: `'Scan QR' Button Clicked`,
      table: {
        disable: true,
      },
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
        {story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof AddressInput>;

const Template: ComponentStory<typeof AddressInput> = (args) => {
  const [ { addressValue }, updateArgs ] = useArgs();

  const handleValueChange = (addressValue: string) => {
    updateArgs({ addressValue: addressValue });
  };

  const handleFocus = (prefill?: string) => {
    if (!prefill) {
      return;
    };
    updateArgs({ addressValue: prefill });
  };

  return <AddressInput
    {...args}
    addressValue={addressValue}
    onValueChange={handleValueChange}
    onFocus={handleFocus}
  />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Enter Or Choose Address',
  addressValue: '0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca',
  inputID: 'default-address-input',
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

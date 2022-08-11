import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from '../components/Loading';
import SendToWalletPageRender from '../components/SendToWalletPageRender';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => {
  return (
    <>
      <SendToWalletPageRender
        totalAmount={45725.06}
        inputAmount='10000'
        inputAddress='0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca'
        areInputsValid={true}
      />
      <Loading {...args}/>;
    </>
  );
};

export const Primary = Template.bind({});
Primary.args={
  primary: true,
};

export const Default = Template.bind({});

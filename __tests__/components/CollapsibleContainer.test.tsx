import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../utils';

import CollapsibleContainer from '../../components/CollapsibleContainer';

describe('Collapsible Container', () => {
  test('correctly renders with default props', () => {
    renderWithTheme(
        <CollapsibleContainer
          label='Wallet'
          primaryContent={<p>Test Content</p>}
        />,
    );

    const testContent = screen.getByText('Test Content');
    const collapseButton = screen.getByRole('button');

    expect(testContent).toBeVisible();
    expect(testContent).toBeInstanceOf(HTMLParagraphElement);

    expect(collapseButton).toBeDisabled();
  });

  test('displays a correct label', () => {
    renderWithTheme(
        <CollapsibleContainer
          label='Wallet'
          primaryContent={<p>Test Content</p>}
        />,
    );

    const label = screen.getByRole('heading');

    expect(label).toHaveTextContent('Wallet');

    expect(label.tagName).toEqual('H2');
  });

  describe('when the container is collapsed,', () => {
    test(`has the primary content visible`, () => {
      renderWithTheme(
          <CollapsibleContainer
            label='Wallet'
            isCollapsed
            primaryContent={<p>Primary Content</p>}
            secondaryContent={<p>Secondary Content</p>}
          />,
      );

      const primaryContent = screen.getByText('Primary Content');

      expect(primaryContent).toBeVisible();
    });

    test('has the secondary content visible', () => {
      renderWithTheme(
          <CollapsibleContainer
            label='Wallet'
            isCollapsed
            primaryContent={<p>Primary Content</p>}
            secondaryContent={<p>Secondary Content</p>}
          />,
      );

      const secondaryContent = screen.getByText('Secondary Content');

      expect(secondaryContent).toBeVisible();
    });
  });

  describe('when the container is not collapsed,', () => {
    test('has the primary content visible', () => {
      renderWithTheme(
          <CollapsibleContainer
            label='Wallet'
            primaryContent={<p>Primary Content</p>}
            secondaryContent={<p>Secondary Content</p>}
          />,
      );

      const primaryContent = screen.getByText('Primary Content');

      expect(primaryContent).toBeVisible();
    });

    test('has the secondary content not visible, but in the document', () => {
      renderWithTheme(
          <CollapsibleContainer
            label='Wallet'
            primaryContent={<p>Primary Content</p>}
            secondaryContent={<p>Secondary Content</p>}
          />,
      );

      const secondaryContent = screen.getByText('Secondary Content');

      expect(secondaryContent).not.toBeVisible();
      expect(secondaryContent).toBeInTheDocument();
    });
  });

  test('calls onCollapseClick when "Collapsed Button" is clicked', async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    renderWithTheme(
        <CollapsibleContainer
          label='Wallet'
          onCollapseClick={mockClickHandler}
          primaryContent={<p>Primary Content</p>}
          secondaryContent={<p>Secondary Content</p>}
        />,
    );

    const collapseButton = screen.getByRole('button');

    await user.click(collapseButton);

    expect(mockClickHandler).toBeCalledTimes(1);
  });

  test(`has "Collapse Button" disabled, when there's no secondary
  content`, async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    renderWithTheme(
        <CollapsibleContainer
          onCollapseClick={mockClickHandler}
          label='Wallet'
          primaryContent={<p>Primary Content</p>}
        />,
    );

    const collapseButton = screen.getByRole('button');

    await user.click(collapseButton);

    expect(collapseButton).toBeDisabled();
    expect(mockClickHandler).not.toBeCalled();
  });

  test(`has "Collapse Button" active without secondary content, when
  "shouldCollapseButtonBeAlwaysActive" prop is set to "true"`, async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    renderWithTheme(
        <CollapsibleContainer
          onCollapseClick={mockClickHandler}
          label='Wallet'
          primaryContent={<p>Primary Content</p>}
          shouldCollapseButtonBeAlwaysActive
        />,
    );

    const collapseButton = screen.getByRole('button');

    await user.click(collapseButton);

    expect(collapseButton).not.toBeDisabled();
    expect(mockClickHandler).toBeCalled();
  });

  test(`renders secondary content outside of container with
  "shouldSecondaryContentBeOutside" prop`, () => {
    renderWithTheme(
        <CollapsibleContainer
          label='Wallet'
          isCollapsed
          shouldSecondaryContentBeOutside
          primaryContent={<p>Primary Content</p>}
          secondaryContent={<p>Secondary Content</p>}
        />,
    );

    const containerContents =
      screen.getByTestId('collapsible-container-contents');
    const secondaryContent = screen.getByText('Secondary Content');

    expect(containerContents).not.toContainElement(secondaryContent);
  });
});

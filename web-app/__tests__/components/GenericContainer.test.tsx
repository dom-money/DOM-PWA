import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../utils';

import GenericContainer from '../../components/GenericContainer';

describe('Generic Container', () => {
  test('displays passed content', () => {
    renderWithTheme(
        <GenericContainer
          label='Your Address to receive funds'
          content={ <p>Sample Content</p> }
        />,
    );

    const content = screen.getByText('Sample Content');

    expect(content).toBeVisible();
  });

  test('displays a correct label', () => {
    renderWithTheme(
        <GenericContainer
          label='Your Address to receive funds'
          content={ <p>Sample Content</p> }
        />,
    );

    const label = screen.getByRole('heading');

    expect(label).toBeVisible();
    expect(label).toHaveTextContent('Your Address to receive funds');
    expect(label.tagName).toEqual('H2');
    expect(label).toHaveStyle('text-transform: uppercase');
  });

  describe('when used as a container for \<input\> element,', () => {
    test(`renders title as a \<label\> element`, () => {
      renderWithTheme(
          <GenericContainer
            label='Enter Amount To Transfer'
            content={ <input id='test-input-id'></input> }
            inputID='test-input-id'
            titleHtmlElement='label'
          />,
      );

      const label = screen.getByText('Enter Amount To Transfer');

      expect(label).toBeInTheDocument();
      expect(label).toBeInstanceOf(HTMLLabelElement);
      expect(label).toHaveAttribute('for', 'test-input-id');
      expect(label).toBeVisible();
    });

    test('renders label with an attribute "for: inputID"', () => {
      renderWithTheme(
          <GenericContainer
            label='Enter Amount To Transfer'
            content={ <input id='test-input-id'></input> }
            inputID='test-input-id'
            titleHtmlElement='label'
          />,
      );

      const label = screen.getByText('Enter Amount To Transfer');

      expect(label).toHaveAttribute('for', 'test-input-id');
    });
  });
});

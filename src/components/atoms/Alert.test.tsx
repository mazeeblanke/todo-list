import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from 'components/atoms/Alert';

test('renders without crashing', () => {
  render(<Alert>error</Alert>);
  const error = screen.getByText(/error/i);
  expect(error).toBeInTheDocument();
});

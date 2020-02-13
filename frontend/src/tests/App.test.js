import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders loading image', () => {
  const { getByAltText } = render(<App />);
  const loadingImage = getByAltText('strawberry');
  expect(loadingImage).toBeInTheDocument();
});

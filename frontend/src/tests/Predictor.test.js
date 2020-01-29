import React from 'react';
import { render } from '@testing-library/react';
import Predictor from '../components/Predictor';

test('predictor renders without crashing', () => {
  render(<Predictor />);
});

describe('when predictor renders,', () => {
  it('has the correct text', () => {
    const { getByText } = render(<Predictor />);
    const header = getByText('Hey there!');
    const instructions = getByText('Tell us about your smoothie', { exact: false });
    expect(header).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  it('has no selected ingredients', () => {
    const { queryAllByAltText } = render(<Predictor />);
    const selectedBorders = queryAllByAltText('selected');
    expect(selectedBorders.length).toBe(0);
  });

  it('disables the generate smoothie button', () => {
    const { getByText } = render(<Predictor />);
    const smoothieButton = getByText('SHOW ME MY SMOOTHIE');
    expect(smoothieButton).toBeDisabled();
  })
});
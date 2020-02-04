import React from 'react';
import { render, wait, waitForElement, fireEvent } from '@testing-library/react';
import Predictor from '../components/Predictor';

const mockData = [
  {"name":"banana","imageURL":"/media/banana.png","color":"#FDE8AE"},
  {"name":"blueberry","imageURL":"/media/blueberry.png","color":"#5F3A81"}
];

const mockResponsePromise = Promise.resolve(mockData);
const mockFetchPromise = Promise.resolve({
  json: () => mockResponsePromise
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

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

  it('fetches the fruit icons from the backend', async () => {
    const { getByAltText } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    expect(fruitIcon).toHaveAttribute('src', '/media/banana.png');
  });

  it('has no selected ingredients', () => {
    const { queryAllByAltText } = render(<Predictor />);
    const selectedBorders = queryAllByAltText('selected');
    expect(selectedBorders.length).toBe(0);
  });

  it('clicking the smoothie button produces an error message', async () => {
    const { getByText } = render(<Predictor />);
    const smoothieButton = getByText('SHOW ME MY SMOOTHIE');
    fireEvent.click(smoothieButton);
    const errorMessage = await waitForElement(() => getByText('Please select your ingredient!'));
    expect(errorMessage).toBeInTheDocument();
  });

  it('smoothie image is not present', () => {
    const { queryAllByTitle } = render(<Predictor />);
    const smoothie = queryAllByTitle('smoothie');
    expect(smoothie.length).toBe(0);
  });
});

describe('when you click on a fruit icon', () => {
  it('selected border appears and smoothie button is enabled', async () => {
    const { getByAltText, getByText } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const selectedBorder = await waitForElement(() => getByAltText('selected'));
    expect(selectedBorder).toBeInTheDocument();
    const smoothieButton = getByText("SHOW ME MY SMOOTHIE");
    expect(smoothieButton).toBeEnabled();
  });

  it('selected border moves to next fruit icon clicked and button remains enabled', async () => {
    const { getByAltText, getByText } = render(<Predictor />);
    const fruitIcon1 = await waitForElement(() => getByAltText('banana icon'));
    const fruitIcon2 = await waitForElement(() => getByAltText('blueberry icon'));
    fireEvent.click(fruitIcon1);
    fireEvent.click(fruitIcon2);
    const selectedBorder = await waitForElement(() => getByAltText('selected'));
    expect(selectedBorder.parentNode).toContainElement(fruitIcon2);
    expect(selectedBorder.parentNode).not.toContainElement(fruitIcon1);
    const smoothieButton = getByText("SHOW ME MY SMOOTHIE");
    expect(smoothieButton).toBeEnabled();
  });

  it('clicking the same fruit button removes selected border and disables button', async () => {
    const { getByAltText, getByText } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const selectedBorder = await waitForElement(() => getByAltText('selected'));
    fireEvent.click(fruitIcon);
    expect(selectedBorder).not.toBeInTheDocument();
  });
});

describe('if you click the smoothie button when it is enabled', () => {
  it('presents a smoothie', async () => {
    const { getByAltText, getByText, getByTitle } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const smoothieButton = getByText('SHOW ME MY SMOOTHIE');
    fireEvent.click(smoothieButton);
    const smoothie = await waitForElement(() => getByTitle('smoothie'));
    expect(smoothie).toBeInTheDocument();
  });

  it('the smoothie is the correct color', async () => {
    const { getByAltText, getByText, getByTitle } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const smoothieButton = getByText('SHOW ME MY SMOOTHIE');
    fireEvent.click(smoothieButton);
    const smoothie = await waitForElement(() => getByTitle('smoothie').nextSibling);
    expect(smoothie).toHaveAttribute('fill', '#FDE8AE');
  });

  it('hides the selector buttons', async () => {
    const { getByAltText, getByText } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const smoothieButton = getByText("SHOW ME MY SMOOTHIE");
    fireEvent.click(smoothieButton);
    expect(fruitIcon).not.toBeInTheDocument();
  });

  it('changes the messages', async () => {
    const { getByText, getByAltText } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const smoothieButton = getByText('SHOW ME MY SMOOTHIE');
    fireEvent.click(smoothieButton);
    const newMessage = await waitForElement(() => getByText('Wow!', { exact: false }));
    expect(newMessage).toBeInTheDocument();
  });
});

describe('when a smoothie is shown', () => {
  it('presents a try again button', async () => {
    const { getByText, getByAltText } = render(<Predictor />);
    const fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const smoothieButton = getByText('SHOW ME MY SMOOTHIE');
    fireEvent.click(smoothieButton);
    const tryAgainButton = await waitForElement(() => getByText('TRY IT AGAIN'));
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('pressing try it again button resets the predictor to no ingredient selected', async () => {
    const { getByText, getByAltText, queryAllByAltText } = render(<Predictor />);
    let fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    fireEvent.click(fruitIcon);
    const smoothieButton = getByText('SHOW ME MY SMOOTHIE');
    fireEvent.click(smoothieButton);
    const tryAgainButton = await waitForElement(() => getByText('TRY IT AGAIN'));
    fireEvent.click(tryAgainButton);
    fruitIcon = await waitForElement(() => getByAltText('banana icon'));
    expect(fruitIcon).toBeInTheDocument();
    const selectedBorders = queryAllByAltText('selected');
    expect(selectedBorders.length).toBe(0);
  });
});
import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import Generator from '../components/Generator';

const mockColorData = [
  {'name':'yellow','color':'#FDE8AE'},
  {'name':'purple', 'color':'#5F3A81'}
];

const mockColorResponse = Promise.resolve(mockColorData);
const mockColorFetch = Promise.resolve({
  json: () => mockColorResponse
});
global.fetch = jest.fn().mockImplementation(() => mockColorFetch);

const mockRecipeData = [
  {'ingredients': {'bananas':'8oz','strawberries':'2oz'}}
];
const mockRecipeResponse = Promise.resolve(mockRecipeData);
const mockRecipeFetch = Promise.resolve({
  json: () => mockRecipeResponse
});

describe('when generator renders', () => {
  it('has the correct text', () => {
    const { getByText } = render(<Generator />);
    const header = getByText('Hey there!');
    const instructions = getByText('Tell us your ideal smoothie', { exact: false });
    expect(header).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  it('no color is selected from drop down', () => {
    const { getByText } = render(<Generator />);
    const defaultSelect = getByText('Select Color', { exact: false });
    expect(defaultSelect).toBeVisible();
  });

  it('clicking the recipe button produces a warning', async () => {
    const { getByText } = render(<Generator />);
    const recipeButton = getByText('SHOW ME HOW TO MAKE IT');
    fireEvent.click(recipeButton);
    const warning = await waitForElement(() => getByText('Please select your desired color!'));
    expect(warning).toBeInTheDocument();
  });
});

describe('clicking on the drop down', () => {
  it('displays list of color options', async () => {
    const { getByText } = render(<Generator />);
    const dropDown = getByText('Select Color', { exact: false });
    fireEvent.click(dropDown);
    const color1 = await waitForElement(() => getByText('yellow'));
    const color2 = await waitForElement(() => getByText('purple'));
    expect(color1).toBeVisible;
    expect(color2).toBeVisible;
  });

  it('then clicking on color selects that color', async () => {
    const { getByText } = render(<Generator />);
    const dropDown = getByText('Select Color', { exact: false });
    fireEvent.click(dropDown);
    const color1 = await waitForElement(() => getByText('yellow'));
    fireEvent.click(color1);
    expect(dropDown).toHaveTextContent('yellow');
  });

  it('selecting a color hides the warning', async () => {
    const { getByText } = render(<Generator />);
    const recipeButton = getByText('SHOW ME HOW TO MAKE IT');
    fireEvent.click(recipeButton);
    const warning = await waitForElement(() => getByText('Please select your desired color!'));
    const dropDown = getByText('Select Color', { exact: false });
    fireEvent.click(dropDown);
    const color1 = await waitForElement(() => getByText('yellow'));
    fireEvent.click(color1);
    expect(warning).toHaveTextContent('');
  });
});

describe('selecting a color then clicking the recipe button', () => {
  it('sends a request to the backend', async () => {
    const { getByText } = render(<Generator />);
    const dropDown = getByText('Select Color', { exact: false });
    fireEvent.click(dropDown);
    const color1 = await waitForElement(() => getByText('yellow'));
    fireEvent.click(color1);
    const recipeButton = getByText('SHOW ME HOW TO MAKE IT');
    global.fetch.mockRestore();
    const fetchColors = global.fetch.mockImplementation(() => mockRecipeFetch);
    fireEvent.click(recipeButton);
    expect(fetchColors).toHaveBeenCalledWith('/api/recipes/' + 'FDE8AE');
    fetchColors.mockRestore();
    global.fetch = jest.fn().mockImplementation(() => mockColorFetch);
  });

  it('shows recipes', async () => {
    const { getByText } = render(<Generator />);
    const dropDown = getByText('Select Color', { exact: false });
    fireEvent.click(dropDown);
    const color1 = await waitForElement(() => getByText('yellow'));
    fireEvent.click(color1);
    const recipeButton = getByText('SHOW ME HOW TO MAKE IT');
    global.fetch.mockRestore();
    const fetchColors = global.fetch.mockImplementation(() => mockRecipeFetch);
    fireEvent.click(recipeButton);
    const recipe = await waitForElement(() => getByText('bananas - 8oz.'));
    expect(recipe).toBeInTheDocument();
    global.fetch.mockRestore();
    global.fetch = jest.fn().mockImplementation(() => mockColorFetch);
  });

  it('clicking try again button resets the generator', async () => {
    const { getByText } = render(<Generator />);
    var dropDown = getByText('Select Color', { exact: false });
    fireEvent.click(dropDown);
    const color1 = await waitForElement(() => getByText('yellow'));
    fireEvent.click(color1);
    const recipeButton = getByText('SHOW ME HOW TO MAKE IT');
    global.fetch.mockRestore();
    const fetchColors = global.fetch.mockImplementation(() => mockRecipeFetch);
    fireEvent.click(recipeButton);
    const resetButton = await waitForElement(() => getByText('TRY IT AGAIN'));
    fireEvent.click(resetButton);
    dropDown = await waitForElement(() => getByText('Select Color', { exact: false }));
    expect(dropDown).toBeInTheDocument();
    global.fetch.mockRestore();
    global.fetch = jest.fn().mockImplementation(() => mockColorFetch);
  });
});

import React from 'react';
import { render, screen, waitForElement, fireEvent } from '@testing-library/react';
import Generator from '../components/Generator';

const mockColorFetch = Promise.resolve({
  json: () => Promise.resolve([
    {'name':'yellow','color':'#FDE8AE'},
    {'name':'purple', 'color':'#5F3A81'}
  ])
});

const mockRecipeFetch = Promise.resolve({
  json: () => Promise.resolve([
    {'ingredients': {'bananas':'8oz','strawberries':'2oz'}}
  ])
});

function mockColorRequest() {
  global.fetch = jest.fn().mockImplementation(() => mockColorFetch);
}

function mockRecipeRequest() {
  global.fetch = jest.fn().mockImplementation(() => mockRecipeFetch);
}

function openDropDown() {
  const dropDown = screen.getByText('Select Color');
  fireEvent.click(dropDown);
  return dropDown;
}

async function clickOnColor(color) {
  const colorItem = await waitForElement(() => screen.getByText(color));
  fireEvent.click(colorItem);
}

function clickRecipeButton() {
  const recipeButton = screen.getByText('SHOW ME HOW TO MAKE IT');
  fireEvent.click(recipeButton);
}

beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(() => {
  mockColorRequest();
  render(<Generator />);
});

describe('when generator renders', () => {
  it('has the correct text', () => {
    const header = screen.getByText('Hey there!');
    const instructions = screen.getByText('Tell us your ideal smoothie', { exact: false });
    expect(header).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  it('no color is selected from drop down', () => {
    const defaultSelect = screen.getByText('Select Color');
    expect(defaultSelect).toBeVisible();
  });

  it('clicking the recipe button produces a warning', async () => {
    clickRecipeButton();
    const warning = await waitForElement(() => screen.getByText('Please select your desired color!'));
    expect(warning).toBeInTheDocument();
  });
});

describe('clicking on the drop down', () => {
  it('displays list of color options', async () => {
    openDropDown();
    const color1 = await waitForElement(() => screen.getByText('yellow'));
    const color2 = await waitForElement(() => screen.getByText('purple'));
    expect(color1).toBeVisible;
    expect(color2).toBeVisible;
  });

  it('then clicking on color selects that color', async () => {
    const dropDown = openDropDown();
    await clickOnColor('yellow');
    expect(dropDown).toHaveTextContent('yellow');
  });

  it('selecting a color hides the warning', async () => {
    clickRecipeButton();
    const warning = await waitForElement(() => screen.getByText('Please select your desired color!'));
    openDropDown();
    await clickOnColor('yellow')
    expect(warning).toHaveTextContent('');
  });
});

describe('selecting a color then clicking the recipe button', () => {
  beforeEach(async () => {
    openDropDown();
    await clickOnColor('yellow');
    mockRecipeRequest();
    clickRecipeButton();
  });

  it('sends a request to the backend', async () => {
    expect(global.fetch).toHaveBeenCalledWith('/api/recipes/' + 'FDE8AE');
  });

  it('shows recipes', async () => {
    const recipe = await waitForElement(() => screen.getByText('bananas - 8oz.'));
    expect(recipe).toBeInTheDocument();
  });

  it('clicking try again button resets the generator', async () => {
    const resetButton = await waitForElement(() => screen.getByText('TRY IT AGAIN'));
    fireEvent.click(resetButton);
    const dropDown = await waitForElement(() => screen.getByText('Select Color'));
    expect(dropDown).toBeInTheDocument();
  });
});

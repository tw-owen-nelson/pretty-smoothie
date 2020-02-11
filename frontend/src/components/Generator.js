import React from 'react';
import { Typography, Button, Menu, MenuItem, GridList, GridListTile } from '@material-ui/core';
import Doodle from './Doodle.js';

class Generator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColorIndex: 0,
      errorIsShown: false,
      recipesShown: false,
      colors: [],
      recipes: []
    };
  }

  componentDidMount() {
    fetch('/api/colors')
      .then(response => response.json())
      .then(data => this.setState({ colors: data }));
  }

  selectColorByIndex = index => {
    this.setState({ selectedColorIndex: index, errorIsShown: false });
  }

  showRecipes = () => {
    const color = this.state.colors[this.state.selectedColorIndex - 1].color.substring(1);
    fetch('/api/recipes/' + color)
      .then(response => response.json())
      .then(data => this.setState({
        recipes: data,
        recipesShown: true
      }));
  }

  showError = () => {
    this.setState({ errorIsShown: true });
  }

  resetGenerator = () => {
    this.setState({
      selectedColorIndex: 0,
      errorIsShown: false,
      recipesShown: false,
      recipes: []
    });
  }

  render() {
    const selectedColorIndex = this.state.selectedColorIndex;
    const colorIsSelected = Boolean(selectedColorIndex);
    const buttonClass = 'smoothie-button' + (colorIsSelected ? '' : ' disabled');
    const recipeButtonFunction = selectedColorIndex > 0 ? this.showRecipes : this.showError;
    const errorMessage = this.state.errorIsShown ? 'Please select your desired color!' : '';

    const content = this.state.recipesShown ? (
      <>
        <Messages recipesShown={true} />
        <RecipeList recipes={this.state.recipes} />
        <Button className='smoothie-button' onClick={this.resetGenerator}>TRY IT AGAIN</Button>
      </>
    ) : (
      <>
        <Messages recipesShown={false} />
        <SelectMenu
          colors={this.state.colors}
          selectedIndex={selectedColorIndex}
          selectColorByIndex={this.selectColorByIndex}
        />
        <Button className={buttonClass} onClick={recipeButtonFunction}>SHOW ME HOW TO MAKE IT</Button>
        <Typography variant='caption'>{errorMessage}</Typography>
      </>
    );

    return (
      <div className='side-by-side'>
        <div className='text-content'>
          {content}
        </div>
        <Doodle stage={this.state.recipesShown} />
      </div>
    );
  }
}

function Messages(props) {
  const message = props.recipesShown ? 'Very pretty! Here are a few recipes to achieve that color.' : 'Hey there!';
  const instructions = props.recipesShown ?
    '' : 'Tell us your ideal smoothie...\nWe\'ll show you how to make it.';

  return (
    <>
      <Typography variant='h4'>{message}</Typography>
      <Typography>{instructions}</Typography>
    </>
  );
}

function SelectMenu(props) {
  const colors = props.colors;
  const selectedIndex = props.selectedIndex;
  const selectColorByIndex = props.selectColorByIndex;
  const [anchorElement, anchorOnElement] = React.useState(null);

  const triangle = (
    <svg width='16' height='8' viewBox='0 0 16 8'>
      <path
        transform={Boolean(anchorElement) ? 'rotate(180,8,4)' : ''}
        fill='#EC6356'
        fillRule='evenodd'
        d='M8 8L0 0h16z'
      />
    </svg>
  );

  const colorBox = (color) => {
    return (
      <svg width='25' height='25' viewBox='0 0 25 25'>
        <rect width='25' height='25' fill={color} fillRule='evenodd' rx='1'/>
      </svg>
    );
  }

  const handleOpen = event => {
    anchorOnElement(event.currentTarget);
  }

  const handleClick = (event, index) => {
    selectColorByIndex(index);
    anchorOnElement(null);
  }

  const handleClose = () => {
    anchorOnElement(null);
  }

  const optionItem = (name, symbol) => {
    return (
      <>
        <Typography className='option-item' variant='caption'>{name}</Typography>
        {symbol}
      </>
    );
  }

  const options = [optionItem('Select Color', triangle)]
    .concat(colors.map(color => optionItem(color.name, colorBox(color.color))));

  const menuItems = options.map((option, index) => {
    return (
      <MenuItem className='dropdown' key={index} onClick={event => handleClick(event, index)}>
        {option}
      </MenuItem>
    );
  });

  return (
    <div>
      <Typography variant='h6'>What color do you want your smoothie to be?</Typography>
      <Button className='dropdown' variant='outlined' onClick={handleOpen}>{options[selectedIndex]}</Button>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        {menuItems}
      </Menu>
    </div>
  );
}

function RecipeList(props) {
  const recipes = props.recipes;
  const styles = {
    'height': 'auto',
  };
  const recipeItem = (recipe, index) => {
    return (
      <GridListTile style={styles} key={index}>
        <div className='recipe-card'>
          <div className='number-box'>
            <Typography variant='h6'>{index + 1}</Typography>
          </div>
          <div className='ingredients'>
            {Object.keys(recipe.ingredients).map(ingredient =>
              <Typography key={ingredient}>{ingredient + ' - ' + recipe.ingredients[ingredient] + '.'}</Typography>
            )}
          </div>
        </div>
      </GridListTile>
    );
  }

  return (
    <GridList cols={1} spacing={10}>
      {recipes.map((recipe, index) => recipeItem(recipe, index))}
    </GridList>
  );
}

export default Generator;
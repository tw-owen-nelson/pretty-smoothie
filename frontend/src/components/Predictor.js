import React from 'react';
import { Typography, GridList, GridListTile, Button } from '@material-ui/core';
import Doodle from './Doodle.js';
import selectedBorder from '../images/selected.svg';
import hover from '../images/hover.svg';
import Smoothie from './SmoothieFactory.js'

class Predictor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientSelected: false,
      selectedFruit: null,
      errorIsShown: false,
      smoothieIsShown: false,
      fruits: []
    };
  }

  componentDidMount() {
    fetch('/api/fruits')
      .then(response => response.json())
      .then(data => this.setState({ fruits: data }));
  }

  onIconClick = ((index) => {
    if (index === this.state.selectedFruit) {
      this.setState({
        ingredientSelected: false,
        selectedFruit: null
      });
    } else {
      this.setState({
        ingredientSelected: true,
        selectedFruit: index
      });
    }
    this.setState({ errorIsShown: false });
  });

  generateSmoothie = () => {
    this.setState({ smoothieIsShown: true });
  }

  showError = () => {
    this.setState({ errorIsShown: true });
  }

  resetPredictor = () => {
    this.setState({
      ingredientSelected: false,
      selectedFruit: null,
      smoothieIsShown: false
    });
  }

  render() {
    const fruits = this.state.fruits;
    const selectedFruit = this.state.selectedFruit;
    const ingredientIsSelected = this.state.ingredientSelected;
    const smoothieIsShown = this.state.smoothieIsShown;

    const smoothieButtonFunction = ingredientIsSelected ? this.generateSmoothie : this.showError;
    const errorMessage = this.state.errorIsShown ? 'Please select your ingredient!' : '';
    const buttonClass = 'smoothie-button' + (ingredientIsSelected ? '' : ' disabled');

    const content = smoothieIsShown ? (
      <>
        <Messages smoothieIsShown={true} />
        <Smoothie color={fruits[selectedFruit].color} />
        <Button className={'smoothie-button'} onClick={this.resetPredictor}>TRY IT AGAIN</Button>
      </>
    ) : (
      <>
        <Messages smoothieIsShown={false} />
        <IngredientSelector fruits={fruits} onClick={this.onIconClick} selectedFruit={selectedFruit} />
        <Button className={buttonClass} onClick={smoothieButtonFunction}>SHOW ME MY SMOOTHIE</Button>
        <Typography variant='caption'>{errorMessage}</Typography>
      </>
    );
    return (
      <div className='side-by-side'>
        <div className='text-content'>
          {content}
        </div>
        <Doodle stage={smoothieIsShown} />
      </div>
    );
  }
}

function Messages(props) {
  const message = props.smoothieIsShown ? 'Wow! That\'s one pretty smoothie.' : 'Hey there!';
  const instructions = props.smoothieIsShown ?
    '' : 'Tell us about your smoothie...\nWe\'ll show you what it\'ll look like.';

  return (
    <>
      <Typography variant='h4'>{message}</Typography>
      <Typography>{instructions}</Typography>
    </>
  );
}

function IngredientSelector(props) {
  const styles = {
    'width': 'auto'
  };
  const tiles = props.fruits.map((fruit, index) => {
    return (
      <GridListTile style={styles} key={index}>
        <IngredientButton fruit={fruit}
                          onClick={() => props.onClick(index)}
                          isSelected={index === props.selectedFruit} />
      </GridListTile>
    );
  });

  return (
    <>
      <Typography variant='h6'>What's going in?</Typography>
      <GridList cols={4} cellHeight='auto' spacing={16}>
        {tiles}
      </GridList>
    </>
  );
}

function IngredientButton(props) {
  const name = props.fruit.name;
  const imageURL = props.fruit.imageURL;
  const isSelected = props.isSelected;
  const border = isSelected ?
    <img src={selectedBorder} className='selected-border' alt='selected' onClick={props.onClick} /> : <></>;

  return (
    <>
      {border}
      <img src={hover} className='hover-overlay' alt='hover' onClick={props.onClick} />
      <img src={imageURL} alt={name + ' icon'} onClick={props.onClick} />
    </>
  );
}

export default Predictor;
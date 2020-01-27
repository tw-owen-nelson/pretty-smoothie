import React from 'react';
import { Typography, GridList, GridListTile } from '@material-ui/core';
import predictorImage from '../images/predictorImage.svg'
import FruitFactory from './FruitFactory'
import selectedBorder from '../images/selected.svg'
import hover from '../images/hover.svg'

class Predictor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ingredientSelected: false};
  }

  render() {
    const ingredientIsSelected = this.state.ingredientSelected;
    const message = ingredientIsSelected ? 'Wow! That\'s one pretty smoothie!' : 'Hey there!';
    const instructions = ingredientIsSelected ? '' : 'Tell us about your smoothie...\nWe\'ll show you what it\'ll look like.';

    return (
      <div className='side-by-side'>
        <div className='text-content'>
          <Typography variant='h2'>{message}</Typography>
          <Typography>{instructions}</Typography>
          <IngredientSelector />
          <button className='smoothie-button' disabled={!ingredientIsSelected}>SHOW ME MY SMOOTHIE</button>
        </div>
        <div className='doodle'>
          <img src={predictorImage} alt='startup website doodle' />
        </div>
      </div>
    );
  }
}

function IngredientSelector() {
  const styles = {
    'width': 'auto'
  };
  return (
    <GridList cols={4} cellHeight='auto' spacing={16}>
      <GridListTile style={styles}>
        <IngredientButton name='banana'/>
      </GridListTile>
      <GridListTile style={styles}>
        <IngredientButton name='blueberry' />
      </GridListTile>
      <GridListTile style={styles}>
        <IngredientButton name='strawberry' />
      </GridListTile>
    </GridList>
  );
}

function IngredientButton(props) {
  const isSelected = props.isSelected;
  const Border = isSelected ? <img src={selectedBorder} className='selected-border' alt='selected'/> : <></>;
  return (
    <span>
      {Border}
      <img src={hover} className='hover-overlay' alt='hover'/>
      <FruitFactory name={props.name} />
    </span>
  );
}

export default Predictor;
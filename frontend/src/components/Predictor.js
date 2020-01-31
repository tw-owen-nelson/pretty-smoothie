import React from 'react';
import { Typography, GridList, GridListTile } from '@material-ui/core';
import predictorImage from '../images/predictorImage.svg'
import selectedBorder from '../images/selected.svg'
import hover from '../images/hover.svg'

class Predictor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientSelected: false,
      selectedFruit: null,
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
  });

  render() {
    const fruits = this.state.fruits;
    const selectedFruit = this.state.selectedFruit;
    const ingredientIsSelected = this.state.ingredientSelected;
    const message = false ? 'Wow! That\'s one pretty smoothie!' : 'Hey there!';
    const instructions = false ? '' : 'Tell us about your smoothie...\nWe\'ll show you what it\'ll look like.';
    return (
      <div className='side-by-side'>
        <div className='text-content'>
          <Typography variant='h2'>{message}</Typography>
          <Typography>{instructions}</Typography>
          <IngredientSelector fruits={fruits} onClick={this.onIconClick} selectedFruit={selectedFruit} />
          <button className='smoothie-button' disabled={!ingredientIsSelected}>SHOW ME MY SMOOTHIE</button>
        </div>
        <div className='doodle'>
          <img src={predictorImage} alt='startup website doodle' />
        </div>
      </div>
    );
  }
}

function IngredientSelector(props) {
  const styles = {
    'width': 'auto'
  };
  const tiles = props.fruits.map((fruit, index) => {
    return (
      <GridListTile style={styles} key={index}>
        <IngredientButton fruit={fruit} onClick={() => props.onClick(index)} isSelected={index === props.selectedFruit} />
      </GridListTile>
    );
  });
  return (
    <GridList cols={4} cellHeight='auto' spacing={16}>
      {tiles}
    </GridList>
  );
}

function IngredientButton(props) {
  const name = props.fruit.name;
  const imageURL = props.fruit.imageURL;
  const isSelected = props.isSelected;
  const border = isSelected ? <img src={selectedBorder} className='selected-border' alt='selected' onClick={props.onClick} /> : <></>;
  return (
    <>
      {border}
      <img src={hover} className='hover-overlay' alt='hover' onClick={props.onClick} />
      <img src={imageURL} alt={name + ' icon'} onClick={props.onClick} />
    </>
  );
}

export default Predictor;
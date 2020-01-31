import React from 'react';
import { Typography, GridList, GridListTile } from '@material-ui/core';
import predictorImage from '../images/predictorImage.svg';
import selectedBorder from '../images/selected.svg';
import hover from '../images/hover.svg';
import cup from '../images/cup.svg';
import smoothie from '../images/smoothie.svg';
import shading from '../images/shading.svg';

class Predictor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientSelected: false,
      selectedFruit: null,
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
  });

  generateSmoothie = () => {
    this.setState({ smoothieIsShown: true });
  }

  resetPredictor = () => {
    this.setState({
      ingredientSelected: false,
      selectedFruit: null,
      smoothieIsShown: false,
    })
  }

  render() {
    const fruits = this.state.fruits;
    const selectedFruit = this.state.selectedFruit;
    const ingredientIsSelected = this.state.ingredientSelected;
    const content = this.state.smoothieIsShown ? (
      <>
        <Messages smoothieIsShown={true} />
        <Smoothie />
        <button className={'smoothie-button'} onClick={this.resetPredictor}>TRY IT AGAIN</button>
      </>
      ) : (
      <>
        <Messages smoothieIsShown={false} />
        <IngredientSelector fruits={fruits} onClick={this.onIconClick} selectedFruit={selectedFruit} />
        <button className={'smoothie-button'} disabled={!ingredientIsSelected} onClick={this.generateSmoothie}>SHOW ME MY SMOOTHIE</button>
      </>
      );
    return (
      <div className='side-by-side'>
        <div className='text-content'>
          {content}
        </div>
        <div className='doodle'>
          <img src={predictorImage} alt='startup website doodle' />
        </div>
      </div>
    );
  }
}

function Smoothie(props) {
  return (
    <div className={'smoothie-image'}>
      <img src={smoothie} className={'smoothie-base'} alt='pretty smoothie'/>
      <img src={shading} className={'smoothie-shading'} />
      <img src={cup} />
    </div>
  );
}

function Messages(props) {
  const message = props.smoothieIsShown ? 'Wow! That\'s one pretty smoothie!' : 'Hey there!';
  const instructions = props.smoothieIsShown ? '' : 'Tell us about your smoothie...\nWe\'ll show you what it\'ll look like.';
  return (
    <>
      <Typography variant='h2'>{message}</Typography>
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
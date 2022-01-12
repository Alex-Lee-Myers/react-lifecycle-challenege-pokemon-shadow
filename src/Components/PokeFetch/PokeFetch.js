import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 0,
      timerOn: false,
      timerInterval: null,
      pokemonRevealed: false,
    }
  }

  //! This is the PokeFetch Lifecycle Challenge. I need to do the following:
  //? 1. Create a Timer that counts down from 10 seconds.
  //? 2. Make sure the timer does not start until the "Start" button is clicked.
  //? 3. Make sure the timer does not go into the negatives.
  //? 4. Once the timer reaches 0, the Pokemon image and name should be revealed.
  //? 5. Restart the game each time the button is pushed without refreshing the page.
  


  // when start button is clicked, fetchPokemon() is called. Once the fetch is complete, the timer starts and it sets 
  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

    //! 1. Create a Timer that counts down from 10 seconds. 
    //? a. fetchPokemon() is called and pokemonRevealed is set to false.
    //? b. sets timerOn to true
    //? c. sets pokeName and pokeSprite classNames to ".pokeNameHidden" and ".pokeSpriteHidden" until it reaches 0.
    //? d. the timer is set to 0 and the timerOn is set to false.
    //? e. when it reaches 0, pokemonRevealed is set to true.
    //? f. when it reaches 0, the pokeName and pokeSprite classNames are set to ".pokeNameRevealed" and ".pokeSpriteRevealed"
    //? g. the timerInterval is cleared.

  startTimer() {
    this.fetchPokemon()
    this.setState({
      timerOn: true,
      pokemonRevealed: false,
    })
    this.setState({
      timer: 10,
    })
    this.setState({
      timerInterval: setInterval(() => {
        if (this.state.timer > 0) {
          this.setState({
            timer: this.state.timer - 1,
          })
        } else {
          this.setState({
            pokemonRevealed: true,
          })
          this.setState({
            timerOn: false,
          })
          clearInterval(this.state.timerInterval)
        }
      }, 1000)
    })
  }



// true or false return for if timer is or not, and null 
// if true, then the timer will start and the pokeSprite will set to the className 'pokeSpriteHidden' and pokeName will set to the className 'pokeNameHidden'
// if false, then the timer will not start and the pokeSprite be set the the className 'pokeSpriteRevealed' and pokeName will be set to classname 'pokeNameRevealed'.
// else, set pokeSprite and pokeName to null and tell the user to click the start button.
// 'pokeSpriteHidden' is the default state.
// 'pokeSpriteRevealed' is the state when the timer has hit 0.

  render() {
    return (
      <div className="PokeFetch">
        <div className="pokeSpriteContainer">
          <img className={this.state.pokemonRevealed ? 'pokeSpriteRevealed' : 'pokeSpriteHidden'} src={this.state.pokeSprite} alt="pokemon sprite" />
        </div>
        <div className="pokeNameContainer">
          <h1 className={this.state.pokemonRevealed ? 'pokeNameRevealed' : 'pokeNameHidden'}>{this.state.pokeName}</h1>
        </div>
        <div className="pokeButtonContainer">
          <button onClick={() => this.startTimer()}>Start</button>
        </div>
        <div className="timerContainer">
          <h1>{this.state.timer}</h1>
        </div>
      </div>
    )
  }
}
  

export default PokeFetch;
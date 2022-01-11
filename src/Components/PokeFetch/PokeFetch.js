import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
//! This is the PokeFetch Lifecycle Challenge. I need to do the following
//? 1. Create a Timer that counts down from 10 seconds.
//? 2. Make sure the timer does not start until the "Start" button is clicked.
//? 3. Make sure the timer does not go into the negatives.
//? 4. Once the timer reaches 0, the Pokemon image should be undarkened and the name should be displayed.
//? 5. Restart the game each time the button is pushed without refreshing the page.
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
    }
  }

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

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;
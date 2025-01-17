import React, { Component } from 'react';
import CookSearchItem from '../CookSearchItem/CookSearchItem.jsx';
import './Search.css'

class Search extends Component {
  constructor(props) {
    super();

    this.state = {
      cooks: [],
      neighborhood: ''
    }

    this.getCooks = this.getCooks.bind(this);
    this.renderCooks = this.renderCooks.bind(this);
    this.updateNeighborhood = this.updateNeighborhood.bind(this);
    this.searchCooks = this.searchCooks.bind(this);
  }

  updateNeighborhood(e) {
    console.log(e.target.value)
    this.setState({
      neighborhood: e.target.value
    });
  }

  searchCooks(){
    fetch('/cooks/searchNeighborhood', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ` + this.props.state.currentToken,
      },
      method: 'POST',
      body: JSON.stringify({
        neighborhood: this.state.neighborhood
      })
    })
      .then(r => r.json())
      .then((cooks) => {
        this.setState({
          cooks: cooks
        })
        console.log(this.state.cooks);
      })
      .catch(err => console.log(err));
      this.renderCooks();
  }

  getCooks(){
    console.log('grabbing all the cooks');
    fetch('/cooks/displayAll')
      .then(r => r.json())
      .then((cooks) => {
        this.setState({
          cooks: cooks
        })
        console.log(this.state.cooks);
      })
      .catch(error => console.log(error));
      this.renderCooks();
  }

    renderCooks() {
      return this.state.cooks.map((cook, i) =>
        <CookSearchItem
          key={i}
          name={cook.name}
          username={cook.username}
          neighborhood={cook.neighborhood}
        />
      );
    }

  render() {
    return (
      <container>
        <h1> SEARCH FOR THINGS! </h1>

        <input
          className="neighborhood-input"
          type="text"
          placeholder="Enter neighborhood"
          value={this.state.neighborhood}
          onChange={this.updateNeighborhood}
        />


        <button onClick={this.searchCooks}>Get Cooks</button>

        <div className="cookContainer">
          {this.renderCooks()}
        </div>
      </container>
    )
  }
}

export default Search;

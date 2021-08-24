import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  adoptPet = identifier => {
    let pet = this.state.pets.find(p => p.id === identifier);
    pet.isAdopted = true;
  }

  getPets = () => {
    let j = `/api/pets?type=${this.state.filters.type}`
    if (this.state.filters.type === 'all') {
    fetch('/api/pets').then(response => response.json())
    .then(pets => this.setState({ pets: pets }))
  } else {
    fetch(j).then(response => response.json())
    .then(pets => this.setState({ pets: pets }))
  }
  }

  typeChange = (event) =>{
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.typeChange}
                onFindPetsClick={this.getPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet}
                pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

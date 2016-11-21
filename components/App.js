const React = require('react');
const { Component } = require('react');

const FruitBasket = require('./FruitBasket');


class App extends Component {
  constructor() {
    super()

    this.state = {
      filters: [],
      fruit: [],
      selectedFilter: null
    }

    this.fetchFilters = this.fetchFilters.bind(this);
    this.fetchFruits = this.fetchFruits.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillMount() {
    this.fetchFilters();
    this.fetchFruits()
  }

  fetchFilters() {
    fetch('/api/fruit_types')
      .then(res => res.json())
      .then(filters => this.setState({filters: filters}));
  }

  fetchFruits() {
    fetch('/api/fruit')
      .then(res => res.json())
      .then(fruit => this.setState({ fruit: fruit}));
  }

  handleFilterChange(event) {
    console.log('new filter: ', event.target.value);
    this.setState({ selectedFilter: event.target.value });
  }

  render() {
    return(
      <FruitBasket
        handleChange={this.handleFilterChange}
        selectedFilter={this.state.selectedFilter}
        filters={this.state.filters}
        fruit={this.state.fruit}
      />
    )
  }
}

module.exports = App;

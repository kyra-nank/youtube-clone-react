import React, { Component } from 'react';

// define a new class called SearchBar and give it all access to functionality from React.Comp class
// class SearchBar extends React.Component {
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' }
  }

  render() {
    return (
      <div className='search-bar'>
        <input
        value={this.state.term}
        onChange={(event) => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;

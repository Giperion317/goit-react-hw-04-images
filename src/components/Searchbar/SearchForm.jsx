import { Component } from 'react';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
      this.props.onSubmit({ ...this.state });
};

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          type="text"
          placeholder="Search images and photos"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

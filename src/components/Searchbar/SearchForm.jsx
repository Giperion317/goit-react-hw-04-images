import { Component } from 'react';
import { toast } from 'react-toastify';
import { Searchform, SearchBtn, SearchInput } from './Searchbar.styled';
import PropTypes from 'prop-types';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      query: value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.warn('Please enter a request')
    }
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <Searchform onSubmit={this.handleSubmit}>
        <SearchBtn type="submit"></SearchBtn>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleChange}
          name="query"
          value={query}
        />
      </Searchform>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
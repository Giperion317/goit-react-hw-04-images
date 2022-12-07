import PropTypes from 'prop-types';

import { SearchForm } from "./SearchForm"

export const Searchbar = ({ onSubmit }) => (
    <header>
        <SearchForm onSubmit={onSubmit} />
    </header>
)

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
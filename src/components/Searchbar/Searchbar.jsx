import PropTypes from 'prop-types';
import { Searcbar } from './Searchbar.styled';
import { SearchForm } from "./SearchForm"

export const Searchbar = ({ onSubmit }) => (
    <Searcbar>
        <SearchForm onSubmit={onSubmit} />
    </Searcbar>
)

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
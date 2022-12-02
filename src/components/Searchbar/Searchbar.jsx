import { SearchForm } from "./SearchForm"

export const Searchbar = ({ onSubmit }) => (
    <header>
        <SearchForm onSubmit={onSubmit} />
    </header>
)
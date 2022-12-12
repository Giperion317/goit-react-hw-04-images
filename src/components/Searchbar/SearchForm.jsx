import { useState } from 'react';
import { toast } from 'react-toastify';
import { Searchform, SearchBtn, SearchInput } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const SearchForm = ({ onSubmit }) => {
  const [serchQuery, setSerchQuery] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSerchQuery(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (serchQuery.trim() === '') {
      return toast.warn('Please enter a request');
    }
    onSubmit(serchQuery);
    reset();
  };

  const reset = () => {
    setSerchQuery('');
  };

  return (
    <Searchform onSubmit={handleSubmit}>
      <SearchBtn type="submit"></SearchBtn>
      <SearchInput
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleChange}
        name="serchQuery"
        value={serchQuery}
      />
    </Searchform>
  );
};

// export class SearchForm extends Component {
//   state = {
//     serchQuery: '',
//   };

//   handleChange = ({ target: { value } }) => {
//     this.setState({
//       serchQuery: value.toLowerCase(),
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.serchQuery.trim() === '') {
//       return toast.warn('Please enter a request')
//     }
//     this.props.onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ serchQuery: '' });
//   };

//   render() {
//     const { serchQuery } = this.state;
//     return (
//       <Searchform onSubmit={this.handleSubmit}>
//         <SearchBtn type="submit"></SearchBtn>
//         <SearchInput
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//           onChange={this.handleChange}
//           name="serchQuery"
//           value={serchQuery}
//         />
//       </Searchform>
//     );
//   }
// }

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

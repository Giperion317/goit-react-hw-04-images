import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export const Button = ({ text, clickHandler }) => {
    return <Btn type="button" onClick={clickHandler}>{ text }</Btn>
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
}
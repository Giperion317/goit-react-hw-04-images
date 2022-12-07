import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
    componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc)
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeByEsc)
    }

  
  closeByEsc = ({ code }) => {
    const { closeModal } = this.props;
    if (code === 'Escape') {
      closeModal();
    }
    };
    
    closeByBackDrop = event => {
    const { closeModal } = this.props;
    if (event.target!==event.currentTarget) {
      closeModal();
    }
  };

  render() {
    const {
      image: { src, alt },
      closeModal,
    } = this.props;
    return (
      <div onClick={this.closeByBackDrop}>
        <div>
          <button type="button" onClick={() => closeModal()}>
            X
          </button>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
}
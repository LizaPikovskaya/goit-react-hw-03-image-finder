import { Component, React } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  static propTypes = {
    useValueFromSearchBar: PropTypes.func,
  };

  state = {
    value: '',
  };
  handlerSubmit = evt => {
    evt.preventDefault();
    if (!this.state.value.trim()) {
      return toast.warn('Please, fill the field.');
    }
    this.props.useValueFromSearchBar(this.state.value);
    this.reset();
  };
  handlerOnChange = evt => {
    this.setState({ value: evt.target.value });
  };

  reset = () => {
    this.setState({ value: '' });
  };
  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handlerSubmit}>
          <SearchFormButton>
            <ImSearch width={30} height={30} />
          </SearchFormButton>
          <SearchFormInput
            onChange={this.handlerOnChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
          <ToastContainer />
        </SearchForm>
      </Header>
    );
  }
}

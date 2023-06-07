import { Component, React } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };
  handlerSubmit = evt => {
    evt.preventDefault();
    if (!this.state.value.trim()) {
      return toast('Please, fill the field.'); // не працює 
    }
    this.props.takeValueFromSearchBar(this.state.value);
    this.reset();
  };
  handlerOnChange = evt => {
    this.setState({ value: evt.target.value });
  };

  reset = () => {
    this.setState({ value: '' });
  };
  render() {
    Searchbar.propTypes = {
      [this.props.takeValueFromSearchBar]: PropTypes.func,
    };
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
        </SearchForm>
      </Header>
    );
  }
}

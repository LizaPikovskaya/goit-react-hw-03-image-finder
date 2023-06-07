import { LoadMoreButton } from "./Button.styled";
import PropTypes from 'prop-types';

export const Button = ({ handlerOnLoadMoreClick }) => {
  return <LoadMoreButton onClick={handlerOnLoadMoreClick}>Load more</LoadMoreButton>;
};

Button.propTypes = {
  handlerOnLoadMoreClick: PropTypes.func,
};

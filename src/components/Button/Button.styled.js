import styled from '@emotion/styled';

export const LoadMoreButton = styled.button`
  display: block;
  margin: 40px auto;
  min-width: 100px;
  padding: 15px 25px;
  cursor: pointer;
  background-color: #3f51b5;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  transition: 250ms linear;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: #6495ed;
  }
`;

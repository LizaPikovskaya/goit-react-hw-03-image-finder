import { Audio } from 'react-loader-spinner';
import { Container } from './Loader.styled';

export const Loader = () => {
  return (
    <Container>
      <Audio
        height="50"
        width="50"
        radius="9"
        color="#3f51b5"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </Container>
  );
};

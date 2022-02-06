import { Heading, Image, Link } from '@chakra-ui/react';
import notFoundImage from '../images/not_found.svg';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Image src={notFoundImage} alt="three people carry 404 letter blocks" />
      <Link opacity="0" href="https://storyset.com/online">
        Online illustrations by Storyset
      </Link>
      <Link
        color="blue.primary"
        textDecoration="underline"
        as={RouterLink}
        to="/"
        fontSize="20px"
        fontWeight="bold"
      >
        Back to the good stuff
      </Link>
    </>
  );
};
export default NotFound;


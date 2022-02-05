import { Box, Link, Icon } from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import { Link as RouterLink } from 'react-router-dom';
const Widgets = () => {
  const { user } = useContext(AuthContext);
  const { handleActiveComp } = useContext(DashboardContext);
  return (
    <Box
      marginLeft="auto"
      display="flex"
      width={['100%', '50%', '100%']}
      justifyContent="flex-end"
      alignItems="center"
    >
      <Link
        as={RouterLink}
        onClick={() => handleActiveComp('Messages')}
        to={`/admin/${user.userId}/messages`}
      >
        <Icon cursor="pointer" mx={5} fontSize={25} color="gray.secondary" as={FiMail} />
      </Link>
    </Box>
  );
};

export default Widgets;


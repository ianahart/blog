
import { Box,Icon, Text, Slide } from '@chakra-ui/react';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import DashLink from './DashLink';
import { FiHome, FiEdit, FiFileText } from 'react-icons/fi';

const Sidebar = ({ isSidebarVisible, curWindowWidth }) => {
  const { user } = useContext(AuthContext);
  const sidebarPos = isSidebarVisible && curWindowWidth <= 768 ? { position: 'absolute', top: 0, right: 0 } : {position: 'relative', top: 0, left: 0}

  const dashLinks = [
    { to: `/admin/${user.userId}/dashboard`, label: 'Dashboard', icon: FiHome },
    { to: `/admin/${user.userId}/your-posts`, label: 'Your Posts', icon: FiFileText },
    { to: `/admin/${user.userId}/editor`, label: 'Editor', icon: FiEdit },
  ];

  return (
    <Box position="relative">
      <Slide
        style={{ position: 'relative', top: '0'}}
        position="relative"
        direction={`${isSidebarVisible ? 'right' : 'left'}`}
        in={isSidebarVisible}
      >

        <Box
          style={sidebarPos}
          minHeight="100vh"
          top="0"
          bottom="0"
          width="300px"
          maxWidth="300px"
          boxShadow={["md", "md", "none"]}
          backgroundColor="#FFF"
          display="flex"
          flexDirection="column"
        >
          <Box
            pt={10}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Box height="45px" width="45px">
              <Icon
                borderRadius="50%"
                color="blue.primary"
                backgroundColor="green.primary"
                height="100%"
                width="100%"
                as={BiUserCircle}
              >
            </Icon>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text fontWeight="bold" color="dark.secondary">{ user.email }</Text>
              <Text fontSize={12} color="gray.text">Admin</Text>
            </Box>
            <Icon fill="green.primary" color="green.primary" as={BsFillBookmarkCheckFill}></Icon>
          </Box>
          <Box mt={10}>
            {dashLinks.map(({ to, label, icon }, index) => {
              return (
                <DashLink key={index} to={to} label={label} icon={icon} />
              )
            })}
          </Box>
       </Box>
     </Slide>
   </Box>
  );
}

export default Sidebar;


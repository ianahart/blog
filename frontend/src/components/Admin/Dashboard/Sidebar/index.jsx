import { Box, Icon, Image, Text, Slide } from '@chakra-ui/react';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import DashLink from './DashLink';
import { FiHome, FiEdit, FiFileText } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({
  isSidebarVisible,
  handleSidebarClose,
  curWindowWidth,
  handleActiveComp,
  activeComp,
}) => {
  const { user } = useContext(AuthContext);
  const isMobile = isSidebarVisible && curWindowWidth <= 768 ? true : false;
  const sidebarPos = isMobile
    ? { position: 'absolute', top: 0, right: 0 }
    : { position: 'relative', top: 0, left: 0 };
  const navigate = useRef(useNavigate());

  const dashLinks = [
    {
      to: `/admin/${user.userId}/settings`,
      label: 'Settings',
      icon: IoSettingsOutline,
      comp: 'Settings',
    },
    {
      to: `/admin/${user.userId}/dashboard`,
      label: 'Dashboard',
      icon: FiHome,
      comp: 'MainView',
    },
    {
      to: `/admin/${user.userId}/your-posts`,
      label: 'Your Posts',
      icon: FiFileText,
      comp: 'AdminPreviews',
    },
    {
      to: `/admin/${user.userId}/editor`,
      label: 'Editor',
      icon: FiEdit,
      comp: 'BlogEditor',
    },
  ];

  useEffect(() => {
    navigate.current(`/admin/${user.userId}/dashboard`);
  }, [user.userId]);

  return (
    <Box
      boxShadow="md"
      position={['relative', 'relative', 'absolute', 'absolute']}
    >
      <Slide
        style={{ position: 'relative', top: '0', zIndex: 10 }}
        position="relative"
        direction={isSidebarVisible ? 'left' : 'right'}
        in={isSidebarVisible}
        unmountOnExit="true"
      >
        <Box
          style={sidebarPos}
          minHeight="100vh"
          top="0"
          bottom="0"
          width="300px"
          maxWidth="300px"
          boxShadow={['md', 'md', 'none']}
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
            {user.avatarUrl ? (
              <Box borderRadius="50%" height="50px" width="50px">
                <Image
                  borderRadius="50%"
                  height="100%"
                  width="100%"
                  src={user.avatarUrl}
                  alt="a users avatar/portrait picture"
                />
              </Box>
            ) : (
              <Box height="45px" width="45px">
                <Icon
                  borderRadius="50%"
                  color="blue.primary"
                  backgroundColor="green.primary"
                  height="100%"
                  width="100%"
                  as={BiUserCircle}
                ></Icon>
              </Box>
            )}
            <Box display="flex" flexDirection="column">
              <Text fontWeight="bold" color="dark.secondary">
                {user.email}
              </Text>
              <Text fontSize={12} color="gray.secondary">
                Admin
              </Text>
              {user?.firstName && user?.lastName && (
                <Box display="flex" flexDirection="row">
                  <Text mr={1} color="gray.secondary" fontSize="12px">
                    {user.firstName}
                  </Text>
                  <Text color="gray.secondary" fontSize="12px">
                    {user.lastName}
                  </Text>
                </Box>
              )}
            </Box>
            <Icon
              fill="green.primary"
              color="green.primary"
              as={BsFillBookmarkCheckFill}
            ></Icon>
          </Box>
          <Box mt={10}>
            {dashLinks.map((link, index) => {
              return (
                <DashLink
                  handleActiveComp={handleActiveComp}
                  handleSidebarClose={handleSidebarClose}
                  activeComp={activeComp}
                  key={index}
                  link={link}
                />
              );
            })}
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default Sidebar;

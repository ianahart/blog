import { Box, Heading } from '@chakra-ui/react'
import MainLogo from '../../../Logos/MainLogo';
import Searchbar from './Searchbar';
import Widgets from './Widgets';
import '@fontsource/caveat-brush/400.css'

const Header = ({ handleSidebarToggle, isSidebarVisible }) => {
  return (
    <Box
       py={1}
       px={3}
      display="flex"
      backgroundColor="#FFF"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <MainLogo
          color="light.primary"
          height="50px"
          width="50px"
        />
        <Box ml={4} display="flex" flexDirection="column">
          <Heading
          display={['none', 'none', 'none', 'none', 'inline-block']}
          fontFamily="caveat brush"
          color="blue.secondary"
          >
            Ian Hart
          </Heading>
        </Box>
      </Box>
      <Box
        width="100%"
        justifyContent="space-around"
        display="flex"
        flexDirection={['row-reverse', 'row-reverse', 'row']}
      >
        <Searchbar isSidebarVisible={isSidebarVisible} handleSidebarToggle={handleSidebarToggle} />
        <Widgets />
      </Box>
    </Box>
  );
}

export default Header;
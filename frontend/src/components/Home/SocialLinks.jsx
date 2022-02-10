import { Text, SlideFade, Link, Box, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { BsFillArrowUpSquareFill, BsBriefcaseFill, BsTwitter, BsLinkedin } from 'react-icons/bs';
const SocialLinks = () => {
  const [isTextShowing, setIsTextShowing] = useState(false);
  const handleOnMouseEnter = () => {
    setIsTextShowing(true);
  };
  const handleOnMouseLeave = () => {
    setIsTextShowing(false);
  };
  return (
    <Box display="flex" mt="2rem" mb="1.5rem">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box onMouseLeave={handleOnMouseLeave} onMouseEnter={handleOnMouseEnter}>
          <Link
            mx="2rem"
            rel="no referrer"
            target="_blank"
            href="https://www.ianalexhart.com"
            alt="ian harts portfolio"
          >
            <Icon
              _hover={{ color: '#0f9564' }}
              color="green.primary"
              height="45px"
              width="45px"
              as={BsBriefcaseFill}
            />
          </Link>
          <SlideFade in={isTextShowing}>
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
              <Icon
                as={BsFillArrowUpSquareFill}
                my="0.5rem"
                color="blue.primary"
                height="24px"
                width="24px"
              />
              <Text color="blue.primary">My Portfolio Site</Text>
            </Box>
          </SlideFade>
        </Box>
      </Box>

      <Link
        mx="2rem"
        rel="no referrer"
        target="_blank"
        href="https://www.twitter.com/ianhart720"
        alt="ians twitter"
      >
        <Icon
          _hover={{ color: '#0f9564' }}
          height="45px"
          color="green.primary"
          width="45px"
          as={BsTwitter}
        />
      </Link>
      <Link
        mx="2rem"
        rel="no referrer"
        target="_blank"
        href="https://www.linkedin.com/in/ian-h-314141127/"
      >
        <Icon
          _hover={{ color: '#0f9564' }}
          color="green.primary"
          height="45px"
          width="45px"
          as={BsLinkedin}
        />
      </Link>
    </Box>
  );
};

export default SocialLinks;

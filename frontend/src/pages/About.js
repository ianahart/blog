import { Heading, Box, Text, Link } from '@chakra-ui/react';
import { useState } from 'react';
import backgroundImage from '../images/about.svg';
import ImageGallery from '../components/About/ImageGallery.jsx';

const About = () => {
  const [isGalleryFullScr, setIsGalleryFullScr] = useState(false);

  const goFullScr = (isFullScr) => {
    setIsGalleryFullScr(isFullScr);
  };

  return (
    <Box
      p={isGalleryFullScr ? 0 : '5rem 0.25rem 2.5rem 0.25rem'}
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      position="relative"
      backgroundPosition="center"
      minHeight="100vh"
      width="100%"
    >
      <Box
        width={isGalleryFullScr ? '100%' : ['95%', '95%', '85%']}
        maxWidth={isGalleryFullScr ? '100%' : '1200px'}
        margin="0 auto"
        display="flex"
        flexDirection={['column', 'column', 'row']}
        p={isGalleryFullScr ? 0 : 1.5}
        justifyContent="space-between"
      >
        <ImageGallery isGalleryFullScr={isGalleryFullScr} goFullScr={goFullScr} />
        {!isGalleryFullScr && (
          <Box
            width={['100%', '100%', '50%']}
            as="main"
            p={1.5}
            my={['1rem', '1rem', 0]}
            backgroundColor="#FFF"
            borderRadius={8}
            boxShadow="md"
          >
            <Heading mt={5} color="dark.secondary" as="h4">
              About{' '}
              <Box as="span" backgroundColor="blue.primary" px={1.5} color="light.primary">
                Ian
              </Box>
            </Heading>
            <Text mt={5} lineHeight={1.6} color="dark.secondary">
              I am a former professional snowboarder turned web developer. After years of competing
              on an international level, I switched over to filming segments for movies, such as
              Quicksilver’s{' '}
              <Link
                color="blue.primary"
                fontWeight="bold"
                rel="no referrer"
                target="_blank"
                href=" https://www.youtube.com/watch?v=dDpnn4c90uQ"
              >
                Take it Easy
              </Link>
              . As of right now I am constantly learning new technologies and concepts to add more
              tools to my belt and one day turn my hobby into a professional career. This blog will
              be used to write about my journey as I try to break into the tech industry. I hope you
              all come along for the ride.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default About;


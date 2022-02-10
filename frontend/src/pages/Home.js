import { Box, Heading, usePrefersReducedMotion, keyframes, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SocialLinks from '../components/Home/SocialLinks.jsx';
import LatestPost from '../components/Home/LatestPost.jsx';
import HomeBG from '../images/home_bg.png';
import portrait from '../images/portrait.png';

const Home = () => {
  const [error, setError] = useState(null);
  const [latestPost, setLatestPost] = useState(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const fade = keyframes`
    from { transform: translateY(-150px); opacity: 0; }
    to { transform: translateY(0px); opacity: 1;}
    `;
  const animation = prefersReducedMotion ? undefined : `${fade} 1s`;

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await axios({ method: 'GET', url: `/api/v1/posts/latest/?size=1` });
        setLatestPost(response.data?.latest_post);
      } catch (e) {
        if (e.response.status !== 500) {
          setError(e.response.data.detail);
        }
      }
    };
    fetchLatestPost();
  }, []);
  return (
    <Box bg="#002233" minHeight="100vh" width="100%">
      <Box height="600px" width="100%" mb={5}>
        <Box
          width="100%"
          justifyContent="space-between"
          height="100%"
          backgroundColor="#002233"
          display="flex"
        >
          <Box
            height="600px"
            display={['none', 'none', 'block']}
            width="33.3%"
            backgroundImage={HomeBG}
            backgroundSize="contain"
            backgroundPosition="center"
          ></Box>

          <Box
            animation={animation}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            width={['100%', '100%', '33.3%']}
          >
            <Heading textTransform="uppercase" my={3} color="#FFF">
              Hi, I'm
              <Box ml={1.5} as="span" color="#FFF" backgroundColor="blue.primary" p="0.2rem 0.5rem">
                Ian
              </Box>
            </Heading>
            <Image src={portrait} alt="Portrait of ian hart" />
          </Box>

          <Box
            display={['none', 'none', 'block']}
            width="33.3%"
            backgroundImage={HomeBG}
            backgroundSize="contain"
            backgroundPosition="center"
          ></Box>
        </Box>
      </Box>
      <Box backgroundColor="#292a2a">
        {latestPost && !error && (
          <Box
            justifyContent="center"
            pt="1rem"
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Heading color="#FFF">
              {' '}
              <Box ml={1.5} as="span" color="#FFF" backgroundColor="blue.primary" p="0.2rem 0.5rem">
                Latest
              </Box>{' '}
              Post
            </Heading>
            <LatestPost post={latestPost} />
          </Box>
        )}
      </Box>
      <Box height="225px" bg="#002233">
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
          margin="0 auto"
          width={['100%', '100%', '750px']}
        >
          <Heading mt="0.75rem" color="light.primary" textTransform="uppercase">
            Let's get{' '}
            <Box as="span" color="#FFF" backgroundColor="blue.primary" p="0.2rem 0.5rem">
              Connected
            </Box>
          </Heading>
          <SocialLinks />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;


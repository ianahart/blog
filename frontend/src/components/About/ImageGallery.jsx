import { Icon, Image, Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFullscreen,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { BiExitFullscreen } from 'react-icons/bi';
import bachelor from '../../images/bachelor.jpeg';
import stevenPass from '../../images/stevens_pass.jpeg';
import sherbrooke from '../../images/sherbrooke.jpeg';
import windells from '../../images/windells.jpeg';
import hcsc from '../../images/hcsc.jpeg';

const ImageGallery = ({ isGalleryFullScr, goFullScr }) => {
  // eslint-disable-next-line
  const [imgs, setImgs] = useState([
    { id: 1, original: `${stevenPass}`, desc: 'Stevens Pass, WA' },
    { id: 2, original: `${bachelor}`, desc: 'Superpark, Mt Bachelor, OR' },
    { id: 3, original: `${sherbrooke}`, desc: 'Sherbrooke, CAN' },
    { id: 4, original: `${windells}`, desc: 'Mt Hood, OR' },
    { id: 5, original: `${hcsc}`, desc: 'Mt Hood, OR' },
  ]);
  const [curImg, setCurImg] = useState(imgs[0]);

  const selectNewImage = (id) => {
    const i = imgs.findIndex((img) => img.id === id);
    setCurImg({ ...imgs[i] });
  };

  const handleArrowClick = (dir) => {
    const i = imgs.findIndex((image) => image.id === curImg.id);
    if (dir === 'next') {
      curImg.id < imgs.length ? setCurImg({ ...imgs[i + 1] }) : setCurImg({ ...imgs[0] });
    }
    if (dir === 'prev') {
      curImg.id > 1 ? setCurImg({ ...imgs[i - 1] }) : setCurImg({ ...imgs[imgs.length - 1] });
    }
  };

  return (
    <Box mr={[0, 0, '1.5rem']} borderRadius={8} width={['100%', '100%', '50%']}>
      <Box
        display="flex"
        alignItems="center"
        flexDir="column"
        justifyContent="center"
        position={isGalleryFullScr ? 'absolute' : 'relative'}
        width={isGalleryFullScr ? '100%' : 'none'}
        pt="1rem"
        height="100%"
        borderRadius={8}
        bg="rgba(0, 0, 0, 0.65)"
      >
        <Box position="relative">
          <Icon
            onClick={() => handleArrowClick('next')}
            role="button"
            display={['none', 'none', 'block']}
            right={isGalleryFullScr ? '-30px' : '-7px'}
            layerStyle="iconArrow"
            color="blue.primary"
            as={BsFillArrowRightCircleFill}
          />
          <Icon
            onClick={isGalleryFullScr ? () => goFullScr(false) : () => goFullScr(true)}
            role="btn"
            ml="auto"
            display="block"
            mr="1rem"
            mb="0.5rem"
            as={isGalleryFullScr ? BiExitFullscreen : BsFullscreen}
            color="#FFF"
            cursor="pointer"
            height="40px"
            width="40px"
          />

          <Image
            width={isGalleryFullScr ? '700px' : '90%'}
            borderRadius={8}
            margin="0 auto"
            src={curImg.original}
            alt={curImg.desc}
          />
          <Icon
            display={['none', 'none', 'block']}
            onClick={() => handleArrowClick('prev')}
            role="button"
            left={isGalleryFullScr ? '-30px' : '-7px'}
            layerStyle="iconArrow"
            color="blue.primary"
            as={BsFillArrowLeftCircleFill}
          />
        </Box>
        <Text p={0.25} fontSize="14px" color="#FFF">
          {curImg.desc}
        </Text>
        <Text fontSize="12px" ml="auto" pr="1rem" color="#FFF">
          {curImg.id} of {imgs.length}
        </Text>
        <Box pt={1} width="100%" display="flex" alignItems="center" justifyContent="space-evenly">
          {imgs.map((img) => {
            return (
              <Box
                onClick={() => selectNewImage(img.id)}
                cursor="pointer"
                borderRadius={8}
                p={1}
                transition="transform 0.2s ease-in-out"
                transform={curImg.id === img.id ? 'scale(1.15, 1.15)' : 'none'}
                key={img.id}
                position="relative"
                width="15%"
                maxWidth="130px"
                mx="1rem"
              >
                <Image borderRadius={2} width="100%" src={img.original} alt={img.desc} />
                <Box
                  borderRadius={8}
                  zIndex={2}
                  top="0"
                  left="0"
                  transition="transform 0.5s ease-in-out"
                  transform={curImg.id === img.id ? 'scale(1.5, 1.5)' : 'none'}
                  bg={curImg.id === img.id ? 'transparent' : 'rgba(0, 0, 0, 0.4)'}
                  position="absolute"
                  height="100%"
                  width="100%"
                ></Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default ImageGallery;

import { Box, Button, Image } from '@chakra-ui/react';
const PreviewHeader = ({ curPreviewTab, handleCurPreviewTab }) => {
  const linksMap = {
    oldest: {
      src: 'https://ianblog.s3.amazonaws.com/static/preview-1.jpeg',
      alt: 'an astronaut in outerspace with earth in the background',
    },
    top: {
      src: 'https://ianblog.s3.amazonaws.com/static/preview-3.jpeg',
      alt: 'a picture of earth from space',
    },
    latest: {
      src: 'https://ianblog.s3.amazonaws.com/static/preview-2.jpeg',
      alt: 'scientists in a labratory',
    },
  };
  const handleOnClick = (e) => {
    e.stopPropagation();
    handleCurPreviewTab(e.target.innerText.toLowerCase());
  };
  const activeBtn = (btn) => (btn === curPreviewTab ? '#048ba8' : 'inherit');

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Button
          color={activeBtn('latest')}
          variant="linkBtn"
          onClick={handleOnClick}
          type="text"
        >
          Latest
        </Button>
        <Button
          color={activeBtn('oldest')}
          variant="linkBtn"
          onClick={handleOnClick}
          type="text"
        >
          Oldest
        </Button>

        <Button
          color={activeBtn('top')}
          variant="linkBtn"
          onClick={handleOnClick}
          type="text"
        >
          Top
        </Button>
      </Box>
      <Box width="100%" height="200px">
        <Image
          borderRadius={8}
          boxShadow="md"
          height="100%"
          width="100%"
          src={linksMap[curPreviewTab].src}
          alt={linksMap[curPreviewTab].alt}
        />
      </Box>
    </Box>
  );
};

export default PreviewHeader;

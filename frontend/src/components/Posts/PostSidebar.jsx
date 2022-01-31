import { Box } from '@chakra-ui/react';

const PostSidebar = ({
  bgColor,
  margin = 0,
  border,
  maxHeight,
  children,
  size,
}) => {
  return (
    <Box
      width={size}
      margin={margin}
      display={['none', 'none', 'block']}
      borderRadius={8}
      border={border}
      bgColor={bgColor}
      maxHeight={maxHeight}
    >
      {children}
    </Box>
  );
};

export default PostSidebar;

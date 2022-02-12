import { Box, Code } from '@chakra-ui/react';

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = (
      <Box display="block" bg="light.primary" as="span">
        <Code bg="light.primary" p={1}>
          <Box bg="light.primary" display="inline-block" width="100%" as="span">
            {children}
          </Box>
        </Code>
      </Box>
    );
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.color) {
    children = <span>{children}</span>;
  }
  return (
    <span style={{ color: leaf.color }} {...attributes}>
      {children}
    </span>
  );
};
export default Leaf;

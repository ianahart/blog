import { Box } from '@chakra-ui/react';

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = (
      <Box p={1} backgroundColor="light.primary">
        <code>{children}</code>
      </Box>
    );
    //children = <code>{children}</code>
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


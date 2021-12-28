import { Box } from "@chakra-ui/react";

const Toolbar = (props) => {
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" p={2}>
      { props.children }
    </Box>
  );
}

export default Toolbar;
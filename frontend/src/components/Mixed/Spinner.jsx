import { Box, Text } from '@chakra-ui/react';

const Spinner = ({
  loading,
  position = 'relative',
  msg = 'Loading...',
  values = { top: 0, right: 0 },
  size,
}) => {
  return (
    <Box
      position={position}
      top={values.top}
      right={values.right}
      display="flex"
      flexDirection="column"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: 'auto',
          background: 'none',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#16db93"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
      <Text fontWeight="bold" textAlign="center" fontSize="18px" color="dark.secondary">
        {msg}
      </Text>
    </Box>
  );
};

export default Spinner;

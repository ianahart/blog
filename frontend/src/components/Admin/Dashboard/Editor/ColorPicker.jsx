import { Box} from "@chakra-ui/react"

const ColorPicker = (props) => {
  const colors = [
    {id: 1, hexCode: '#4c4b4b'},
    {id: 2,  hexCode: '#686D76'},
    {id: 3,  hexCode: '#0048BA'},
    {id: 4,  hexCode: '#B284BE'},
    {id: 5,  hexCode: '#E52B50'},
    {id: 6,  hexCode: '#3DDC84'},
    {id: 7,  hexCode: '#FDEE00'},
    {id: 8,  hexCode: '#FFB200'},
    {id: 9,  hexCode: '#FE6F5E'},
    {id: 10,  hexCode: '#54626F	'},
    {id: 11,  hexCode: '#008000'},
    {id: 12,  hexCode: '#007FFF'},
    {id: 13,  hexCode: '#BFFF00'},
    {id: 14,  hexCode: '#2F847C	'},
  ];

  return (
    <Box position="relative">
    {props.isColorPickerShowing &&
      <Box
        display="flex"
        flexWrap="wrap"
        width="140px"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        height="100%"
        boxShadow="md"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        zIndex={6}
        top="50px"
        borderRadius={8}
        position="absolute">
        {
          colors.map(({ id, hexCode }) => {
            return (
              <Box
                onMouseDown={() => props.handleColorPick(hexCode)}
                borderRadius={3}
                border={props.curColor === hexCode ? '1px solid black' : 'none'}
                mx={1}
                key={id}
                height="18px"
                backgroundColor={hexCode}
                width="18px"
                cursor="pointer">
              </Box>
            )
          })
        }
      </Box>
    }
      {props.children}
    </Box>
  )
}

export default ColorPicker;
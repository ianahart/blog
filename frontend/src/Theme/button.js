const Button = {
  variants: {
    main: {
      backgroundColor: '#048BA8',
      minWidth: ['120px', '200px'],
      transition: 'all 0.5s ease-in-out',
      textTransform: 'uppercase',
      color: '#fff',
      _hover: {
        backgroundColor: '#03619b',
      },
    },
    inputBtn: {
      backgroundColor: '#03619b',
      transition: 'all 0.5s ease-in-out',
      color: '#fff',
      _hover: {
        backgroundColor: '#048ba8',
      },
    },
    linkBtn: {
      _focus: { boxShadow: 'none', outline: 'none' },
      outline: 'none',
      _active: { border: '2px solid #048ba8', outline: 'none' },
      backgroundPosition: '0 100%',
      backgroundSize: '0 0',
      transition: 'background-size 0.3s ease-in-out',
      backgroundRepeat: 'repeat-x',
      _hover: { backgroundSize: '4px 50px', color: '#FFF' },
      bgGradient: 'linear(to-br, #048ba8 0%, #048ba8 100%)',
    },
  },
};
export default Button;

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
  },
};
export default Button;

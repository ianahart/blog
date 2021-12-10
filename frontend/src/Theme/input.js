const Input = {
  variants: {
    minimal: {
      field: {
        width: '95%',
        fontSize: '1.1rem',
        margin: '0 auto',
        display: 'flex',
        border: 'none',
        borderBottom: '1px solid #e3e5e7',
        backgroundColor: 'transparent',
        _focus: {
          boxShadow: 'none',
          borderBottom: '2px solid #005082',
          opacity: '0.6',
          backgroundColor: '#E7F0FE',
        },
       _placeholder: {
         fontStyle: 'italic',
         fontSize: '0.95rem'
       }
      },
    },
  },
};
export default Input;
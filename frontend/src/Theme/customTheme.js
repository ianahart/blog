import { extendTheme } from '@chakra-ui/react'
import Input from './input';
import Button from './button';
import FormLabel from './formLabel';

const customTheme = extendTheme({
    components: {
        Link:  { baseStyle: { _focus: { boxShadow: 'none' } } },
        Input,
        Button,
        FormLabel,
    },
    shadows: {
        black: '0 3px 15px rgb(0 0 0 / 20%);'
    },
    colors: {
        light: {
            primary: '#EEEEEE',
            hover: '#dedcdc',
        },
        dark: {
            primary: '#4c4b4b',
            secondary: '#686D76',
            primaryHover: '#2c2e33',
            secondaryHover: '#5a5e66',
        },
        gray: {
            primary: '#544f47',
            secondary: '#8d8d8f',
            outline: '#e3e2e2',
            text: '#d3cece'
        },

        green: {
            primary: '#16DB93'
        },
        pink: {
            primary: "#A4036F"
        },
        orange: {
            primary: 'F29E4C',
        },
        yellow: {
            primary: '#EFEA5A',
        },
        blue: {
            primary: '#048BA8',
            primaryHover: '#2583c2',
            light: '#00A8CC',
            secondary: '#05b4da',
            secondaryHover: '#8eb7d1',
        },
        validationError: {
            primary: '#ababab',
        }

    },
    fontSizes: {
        xxs: '0.625rem'
    },
    space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    },
    fonts: {
        heading: 'Readex Pro',
        body: 'Roboto Condensed',
  },
});

export default customTheme
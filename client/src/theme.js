import { extendTheme } from '@chakra-ui/react';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

const colors = {
  brand: {
    50: '#e3f3ff',
    100: '#bdd9f5',
    200: '#96bee9',
    300: '#6ea4dd',
    400: '#478ad2',
    500: '#2d71b8',
    600: '#205890',
    700: '#143f68',
    800: '#062641',
    900: '#000e1b',
  },
};

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Raleway',
  },
  colors,
});

export default theme;

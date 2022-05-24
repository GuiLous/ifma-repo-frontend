import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
    green: {
      '50': '#F0FFF4',
      '100': '#e1f2e7',
      '150': '#C6F6D5',
      '200': '#9AE6B4',
      '300': '#68D391',
      '400': '#48BB78',
      '500': '#38A169',
      '600': '#2F855A',
      '700': '#276749',
      '800': '#22543D',
      '900': '#1C4532',
      '1000': '#5c6b63',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  styles: {
    global: {
      body: {
        bgGradient: 'linear(to-r, green.50, green.100)',
        color: 'gray.300',
      },
    },
  },
});

import { Heading } from '@chakra-ui/react';

interface HeadingBarProps {
  textContent: string;
}

export default function HeadingBar({ textContent }: HeadingBarProps) {
  return (
    <Heading
      fontWeight={500}
      letterSpacing={['4', '6']}
      fontSize={['0.8rem', '1.2rem']}
      color="White"
      bgGradient="linear(to-l, green.200, green.300, green.400)"
      px={['3', '5', '10']}
      py={['2', '4']}
      borderRadius="2"
      mt={['3', '5', '7']}
      mb={['2', '4']}
      textTransform="uppercase"
    >
      {textContent}
    </Heading>
  );
}

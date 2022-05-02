import { RiInformationFill, RiMessageFill } from 'react-icons/ri';

import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
  return (
    <Flex
      w="100%"
      maxWidth={1180}
      align="center"
      justify="space-between"
      mx="auto"
      bgGradient="linear(to-t, green.300, green.400, green.600)"
      boxShadow="0 -5px 60px 1px rgba(0, 0, 0, 0.2)"
      px={['4', '6', '8']}
      py={['2', '4', '6']}
      borderRadius="6px 6px 0 0"
      color="White"
      fontWeight={500}
      fontSize={['0.6rem', '0.8rem', '1rem']}
      direction={['column', 'column', 'row', 'row']}
    >
      <Flex align="center" justify="space-between" mb={['4', '4', '0', '0']}>
        <Text
          borderRight="1px"
          borderColor="gray.200"
          pr={['2', '4']}
          marginRight={['2', '4']}
        >
          COPYRIGHT&copy; - 2022
        </Text>
        <NextLink href="https://caxias.ifma.edu.br/" passHref>
          <Link target="_blank">
            <Text>IFMA - Caxias</Text>
          </Link>
        </NextLink>
      </Flex>

      <Flex align="center" justify="space-between">
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center" mr="6">
            <Icon
              color="gray.100"
              fontSize={[18, 23, 25]}
              as={RiInformationFill}
              mr="2"
            />
            <Text>Como funciona?</Text>
          </Link>
        </NextLink>

        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Icon
              color="gray.100"
              fontSize={[18, 23, 25]}
              as={RiMessageFill}
              mr="2"
            />
            <Text>Fale Conosco</Text>
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
}

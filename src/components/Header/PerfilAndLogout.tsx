import { RiLogoutBoxRLine } from 'react-icons/ri';

import { Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function PerfilAndLogout() {
  return (
    <Flex flexDir="column" align="flex-start" pt="1" gap="2">
      <NextLink href="/" passHref>
        <Link
          fontSize={['0.8rem', '0.8rem', '0.9rem', '1rem']}
          color="gray.600"
          fontWeight={500}
          textDecoration="underline"
          textUnderlineOffset={2}
          _hover={{ color: 'gray.400' }}
        >
          Meu Perfil
        </Link>
      </NextLink>

      <Button
        variant="unstyled"
        height="auto"
        fontSize={['0.8rem', '0.8rem']}
        minW="unset"
        color="red.600"
        fontWeight="500"
        _hover={{ color: 'red.200' }}
      >
        <Flex align="center" gap="1">
          <Icon ml="-2px" fontSize={19} as={RiLogoutBoxRLine} />
          <Text>Sair</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

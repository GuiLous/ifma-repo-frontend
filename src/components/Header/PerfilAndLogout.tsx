import { useContext } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { AuthContext } from '../../contexts/AuthContext';

export function PerfilAndLogout() {
  const { signOut } = useContext(AuthContext);

  async function handleLogout() {
    await signOut();
  }

  return (
    <Flex flexDir="column" align="flex-start" pt="1" gap="2">
      <NextLink href="/dashboard" passHref>
        <Link
          fontSize={['0.8rem', '0.8rem', '0.9rem', '1rem']}
          color="gray.500"
          fontWeight={500}
          textDecoration="underline"
          textUnderlineOffset={2}
          _hover={{ color: 'gray.300' }}
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
        _hover={{ color: 'red.400' }}
        onClick={handleLogout}
      >
        <Flex align="center" gap="1">
          <Icon ml="-2px" fontSize={19} as={RiLogoutBoxRLine} />
          <Text>Sair</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

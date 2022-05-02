import { useContext } from 'react';

import { Flex, Image, Link, useBreakpointValue } from '@chakra-ui/react';
import NextLink from 'next/link';

import { AuthContext } from '../../context/AuthContext';
import { LoginOrCreate } from './LoginOrCreate';
import { Profile } from './Profile';

export function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      as="header"
      maxWidth={1180}
      w="100%"
      direction={['column', 'column', 'row']}
      px={['2', '4', '6']}
      py={['2', '4', '6']}
      bg="White"
      boxShadow="md"
      borderRadius="8"
      align="center"
      justifyContent="space-between"
      top="0"
      mx="auto"
      zIndex="100"
    >
      <NextLink href="/" passHref>
        <Link>
          <Image
            w={['120px', '170px', '240px']}
            src="/images/logo.png"
            alt="Logo com nome IFMA"
            mb={['6', '6', '0']}
          />
        </Link>
      </NextLink>

      {isAuthenticated ? (
        <Profile showProfileData={isWideVersion} />
      ) : (
        <LoginOrCreate />
      )}
    </Flex>
  );
}

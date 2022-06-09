import { useContext, useEffect } from 'react';
import { RiMenuLine } from 'react-icons/ri';

import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';
import { SidebarDrawerContext } from '../../contexts/SidebarDrawerContext';
import { DropDawnMenu } from '../DropDawnMenu';
import { Separator } from '../Separator';
import { LoginOrCreate } from './LoginOrCreate';
import { Logo } from './Logo';
import { PerfilAndLogout } from './PerfilAndLogout';
import { Profile } from './Profile';

export function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const { onOpen, isOpen, onClose } = useContext(SidebarDrawerContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <Flex
        as="header"
        maxWidth={1180}
        w="100%"
        direction={isAuthenticated ? 'row' : ['column', 'column', 'row']}
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
        <Logo />

        {!isWideVersion && isAuthenticated && (
          <>
            <IconButton
              aria-label="Open navigation"
              icon={<Icon as={RiMenuLine} />}
              fontSize="24"
              variant="unstyled"
              onClick={onOpen}
              mr="2"
              mt="3"
            />
          </>
        )}

        <DropDawnMenu isOpen={isOpen} onClose={onClose} />

        {isAuthenticated ? (
          <>
            {isWideVersion && (
              <Flex align="center" gap="6">
                <Profile showProfileData={isWideVersion} />

                <Separator />

                <PerfilAndLogout />
              </Flex>
            )}
          </>
        ) : (
          <LoginOrCreate />
        )}
      </Flex>
    </>
  );
}

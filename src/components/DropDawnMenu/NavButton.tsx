import { ElementType, useContext } from 'react';

import {
  Icon,
  Button,
  Text,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';

interface NavButtonProps extends ChakraButtonProps {
  icon: ElementType;
  children: string;
}

export function NavButton({ icon, children, ...rest }: NavButtonProps) {
  const { signOut } = useContext(AuthContext);

  async function handleLogout() {
    await signOut();
  }

  return (
    <Button
      {...rest}
      display="flex"
      w="100%"
      alignItems="center"
      justifyContent="flex-start"
      pl="4"
      pt="3"
      pb="3"
      variant="unstyled"
      onClick={handleLogout}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight={400}>
        {children}
      </Text>
    </Button>
  );
}

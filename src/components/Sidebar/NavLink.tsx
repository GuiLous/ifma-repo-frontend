import { ElementType } from 'react';

import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        {...rest}
        display="flex"
        w="100%"
        alignItems="center"
        pl="4"
        pt="3"
        pb="3"
        // _hover={{ textDecoration: 'none', color: 'gray.700' }}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight={400}>
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}

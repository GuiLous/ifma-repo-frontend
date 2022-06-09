import { RiContactsLine, RiLogoutBoxRLine } from 'react-icons/ri';

import { Stack } from '@chakra-ui/react';

import { NavButton } from './NavButton';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav() {
  return (
    <Stack mt="12" spacing={['4', '6']} align="flex-start">
      <NavSection title="Perfil">
        <NavLink icon={RiContactsLine} href="/dashboard">
          Meu Perfil
        </NavLink>
        <NavButton icon={RiLogoutBoxRLine}>Sair</NavButton>
      </NavSection>
    </Stack>
  );
}

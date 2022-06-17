import { useContext } from 'react';
import {
  RiAddLine,
  RiCheckLine,
  RiContactsLine,
  RiFile2Line,
  RiFileInfoLine,
  RiLoader4Line,
} from 'react-icons/ri';

import { Stack } from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav() {
  const { user } = useContext(AuthContext);

  return (
    <Stack mt="12" spacing={['4', '6']} align="flex-start">
      {user?.isAdmin ? (
        <NavSection title="PERFIS">
          <NavLink icon={RiContactsLine} href="/dashboard">
            Usuários
          </NavLink>
        </NavSection>
      ) : (
        <NavSection title="PERFIL">
          <NavLink icon={RiContactsLine} href="/dashboard">
            Usuário
          </NavLink>
        </NavSection>
      )}
      {!user?.isAdmin && !user?.isAdvisor && (
        <NavSection title="SUBMISSÕES">
          <NavLink icon={RiAddLine} href="/dashboard/new-submission">
            Nova Submissão
          </NavLink>
          <NavLink icon={RiCheckLine} href="/dashboard/accepts-submissions">
            Minhas Submissões
          </NavLink>
          <NavLink icon={RiLoader4Line} href="/dashboard/pendent-submissions">
            Submissões em Análise
          </NavLink>
          <NavLink icon={RiFileInfoLine} href="/dashboard/recused-submissions">
            Submissões Recusadas
          </NavLink>
        </NavSection>
      )}

      {user?.isAdvisor && (
        <NavSection title="SUBMISSÕES">
          <NavLink icon={RiAddLine} href="/dashboard/new-submission">
            Nova Submissão
          </NavLink>
          <NavLink icon={RiCheckLine} href="/dashboard/accepts-submissions">
            Minhas Submissões
          </NavLink>
          <NavLink icon={RiFileInfoLine} href="/dashboard/review-submissions">
            Verificar Submissões
          </NavLink>
        </NavSection>
      )}

      {user?.isAdmin && (
        <NavSection title="ADMINISTRADOR">
          <NavLink icon={RiAddLine} href="/dashboard/new-submission">
            Nova Submissão
          </NavLink>
          <NavLink icon={RiFile2Line} href="/dashboard/all-submissions">
            Submissões Verificadas
          </NavLink>
          <NavLink icon={RiFileInfoLine} href="/dashboard/review-submissions">
            Verificar Submissões
          </NavLink>
          <NavLink
            icon={RiFileInfoLine}
            href="/dashboard/recused-verifications"
          >
            Verificações Recusadas
          </NavLink>
        </NavSection>
      )}
    </Stack>
  );
}

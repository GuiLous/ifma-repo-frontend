import { useContext } from 'react';
import {
  RiAddLine,
  RiCheckLine,
  RiContactsLine,
  RiDoorLine,
  RiFile2Line,
  RiFileInfoLine,
  RiLoader4Line,
  RiSafeLine,
} from 'react-icons/ri';

import { Box, Stack } from '@chakra-ui/react';

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
      <NavSection title="SUBMISSÕES">
        <NavLink icon={RiAddLine} href="/dashboard/new-submission">
          Nova Submissão
        </NavLink>
        {!user?.isAdmin && (
          <>
            <NavLink icon={RiCheckLine} href="/accepts-submissions">
              Minhas Submissões
            </NavLink>
            <NavLink icon={RiLoader4Line} href="/dashboard/review-submissions">
              Submissões em Análise
            </NavLink>
            <NavLink
              icon={RiFileInfoLine}
              href="/dashboard/recused-submissions"
            >
              Submissões Recusadas
            </NavLink>
          </>
        )}
      </NavSection>

      {user?.isAdmin && (
        <NavSection title="ADMINISTRADOR">
          <NavLink icon={RiFile2Line} href="/dashboard/recused-submissions">
            Todas Submissões
          </NavLink>
          <NavLink icon={RiFileInfoLine} href="/dashboard/new-submission">
            Verificar Submissões
          </NavLink>
          <NavLink icon={RiAddLine} href="/dashboard/new-submission">
            Cadastrar Cursos
          </NavLink>
          <NavLink icon={RiAddLine} href="/dashboard/new-submission">
            Cadastrar Área de Conhecimento
          </NavLink>
        </NavSection>
      )}
    </Stack>
  );
}

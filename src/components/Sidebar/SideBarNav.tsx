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
      {!user?.isAdmin && (
        <NavSection title="SUBMISSÕES">
          <NavLink icon={RiAddLine} href="/new-submission">
            Nova Submissão
          </NavLink>
          <NavLink icon={RiCheckLine} href="/accepts-submissions">
            Minhas Submissões
          </NavLink>
          <NavLink icon={RiLoader4Line} href="/review-submissions">
            Submissões em Análise
          </NavLink>
          <NavLink icon={RiFileInfoLine} href="/recused-submissions">
            Submissões Recusadas
          </NavLink>
        </NavSection>
      )}

      {user?.isAdmin && (
        <NavSection title="ADMINISTRADOR">
          <NavLink icon={RiAddLine} href="/dashboard/new-submission">
            Nova Submissão
          </NavLink>
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

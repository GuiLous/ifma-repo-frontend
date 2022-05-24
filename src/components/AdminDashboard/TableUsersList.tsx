import { useState } from 'react';
import { RiPencilLine } from 'react-icons/ri';
import { useMutation } from 'react-query';

import {
  Box,
  Button,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { User } from '.';
import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';

interface TableUsersListProps {
  users: User[];
}

export function TableUsersList({ users }: TableUsersListProps) {
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const turnUserInAdvisor = useMutation(
    async (user_id: string) => {
      await api.put('/users/update-advisor', {
        user_id: user_id,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  async function handleTurnUserInAdvisor(user_id: string) {
    setIsLoadingButton(true);
    await turnUserInAdvisor.mutateAsync(user_id);
    setIsLoadingButton(false);
  }

  return (
    <>
      {isWideVersion ? (
        <Table colorScheme="green">
          <Thead>
            <Tr>
              <Th color="gray.300">Usuários</Th>
              <Th color="gray.300">Data de Cadastro</Th>
              <Th color="gray.300">É Orientador?</Th>
              <Th color="gray.300">Ação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Box>
                    <Text
                      color="purple.500"
                      fontSize={['0.8rem', '0.9rem', '1rem']}
                      fontWeight="bold"
                    >
                      {user.fullName}
                    </Text>
                    <Text
                      fontSize={['0.7rem', '0.8rem', '0.9rem']}
                      color="gray.300"
                    >
                      {user.email}
                    </Text>
                  </Box>
                </Td>
                <Td fontSize={['0.8rem', '0.9rem', '1rem']}>
                  {user.created_at}
                </Td>
                <Td
                  fontSize={['0.8rem', '0.9rem', '1rem']}
                  color={user?.isAdvisor ? 'green.400' : 'gray.700'}
                >{`${user.isAdvisor}`}</Td>
                <Td>
                  <Button
                    type="button"
                    fontSize="sm"
                    colorScheme={user?.isAdvisor ? 'green' : 'yellow'}
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    onClick={() => handleTurnUserInAdvisor(user.id)}
                    isLoading={isLoadingButton}
                  >
                    <Text>
                      {isWideVersion
                        ? user?.isAdvisor
                          ? 'Remover Orientador'
                          : 'Tornar Orientador'
                        : ''}
                    </Text>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <TableContainer>
          <Table colorScheme="green">
            <Thead>
              <Tr>
                <Th color="gray.300">Usuários</Th>
                <Th color="gray.300">Data de Cadastro</Th>
                <Th color="gray.300">É Orientador?</Th>
                <Th color="gray.300">Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Box>
                      <Text
                        color="purple.500"
                        fontSize={['0.8rem', '0.9rem', '1rem']}
                        fontWeight="bold"
                      >
                        {user.fullName}
                      </Text>
                      <Text
                        fontSize={['0.7rem', '0.8rem', '0.9rem']}
                        color="gray.300"
                      >
                        {user.email}
                      </Text>
                    </Box>
                  </Td>
                  <Td fontSize={['0.8rem', '0.9rem', '1rem']}>
                    {user.created_at}
                  </Td>
                  <Td
                    fontSize={['0.8rem', '0.9rem', '1rem']}
                    color={user?.isAdvisor ? 'green.400' : 'gray.700'}
                  >{`${user.isAdvisor}`}</Td>
                  <Td>
                    <Button
                      type="button"
                      fontSize="sm"
                      colorScheme={user?.isAdvisor ? 'green' : 'yellow'}
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      onClick={() => handleTurnUserInAdvisor(user.id)}
                      isLoading={isLoadingButton}
                    >
                      <Text>
                        {isWideVersion
                          ? user?.isAdvisor
                            ? 'Remover Orientador'
                            : 'Tornar Orientador'
                          : ''}
                      </Text>
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

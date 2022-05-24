import { RiPencilLine } from 'react-icons/ri';

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

interface TableUsersListProps {
  users: User[];
}
export function TableUsersList({ users }: TableUsersListProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

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
                >{`${user.isAdvisor}`}</Td>
                <Td>
                  <Button
                    fontSize="sm"
                    colorScheme="yellow"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                    <Text>{isWideVersion ? 'Tornar Orientador' : ''}</Text>
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
                  >{`${user.isAdvisor}`}</Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="yellow"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      {isWideVersion ? 'Tornar Orientador' : ''}
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

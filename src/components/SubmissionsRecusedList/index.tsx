import { useContext } from 'react';
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

import { AuthContext } from '../../contexts/AuthContext';

interface Work {
  id: string;
  title: string;
  published_date: string;
  comments_if_not_accept: string;
}

interface SubmissionsRecusedListProps {
  works: Work[];
}

export function SubmissionsRecusedList({ works }: SubmissionsRecusedListProps) {
  const { user } = useContext(AuthContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      {isWideVersion ? (
        <Table colorScheme="green" size="lg">
          <Thead>
            <Tr>
              <Th color="gray.300" w="100%" maxWidth="40%">
                Título
              </Th>
              <Th color="gray.300">Data de publicação</Th>
              <Th color="gray.300">Comentário</Th>
              {!user?.isAdmin && <Th color="gray.300">Ação</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {works?.map((work) => (
              <Tr key={work?.id}>
                <Td
                  color="red.500"
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                >
                  <Text>{work?.title}</Text>
                </Td>
                <Td fontSize={['0.8rem', '0.9rem', '1rem']}>
                  {work?.published_date}
                </Td>
                <Td fontSize={['0.8rem', '0.9rem', '1rem']} color="red.400">
                  {work?.comments_if_not_accept}
                </Td>
                {!user?.isAdmin && (
                  <Td>
                    <Button
                      as="a"
                      href={`/dashboard/edit-submission/${work?.id}`}
                      size="sm"
                      fontSize="sm"
                      colorScheme="yellow"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      {isWideVersion ? 'Editar' : ''}
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <TableContainer>
          <Table colorScheme="green" size="lg">
            <Thead>
              <Tr>
                <Th color="gray.300">Título</Th>
                <Th color="gray.300">Data de publicação</Th>
                <Th color="gray.300">Comentário</Th>
                {!user?.isAdmin && <Th color="gray.300">Ação</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {works?.map((work) => (
                <Tr key={work?.id}>
                  <Td
                    color="red.500"
                    fontSize={['0.7rem', '0.9rem', '1rem']}
                    fontWeight="bold"
                  >
                    <Text>{work?.title}</Text>
                  </Td>
                  <Td fontSize={['0.8rem', '0.9rem', '1rem']}>
                    {work?.published_date}
                  </Td>
                  <Td fontSize={['0.8rem', '0.9rem', '1rem']} color="red.400">
                    {work?.comments_if_not_accept}
                  </Td>
                  {!user?.isAdmin && (
                    <Td>
                      <Button
                        as="a"
                        href={`/dashboard/edit-submission/${work?.id}`}
                        size="sm"
                        fontSize="sm"
                        colorScheme="yellow"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        {isWideVersion ? 'Editar' : ''}
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

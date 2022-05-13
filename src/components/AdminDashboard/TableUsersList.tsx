import { RiPencilLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

export function TableUsersList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Table colorScheme="green">
      <Thead>
        <Tr>
          <Th color="gray.300">Usuários</Th>
          <Th color="gray.300">Data de Cadastro</Th>
          <Th color="gray.300">Orientador?</Th>
          <Th color="gray.300">Ação</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <Box>
              <Text
                color="purple.500"
                fontSize={['0.8rem', '0.9rem', '1rem']}
                fontWeight="bold"
              >
                Guilherme Lourenco
              </Text>
              <Text fontSize={['0.7rem', '0.8rem', '0.9rem']} color="gray.300">
                guilherme@gmail.com
              </Text>
            </Box>
          </Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>22-01-2022</Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>False</Td>
          <Td>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="yellow"
              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
            >
              {isWideVersion ? 'Orientador' : ''}
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

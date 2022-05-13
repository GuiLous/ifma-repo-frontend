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

export function SubmissionsAcceptList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Table colorScheme="green">
      <Thead>
        <Tr>
          <Th color="gray.300">Título</Th>
          <Th color="gray.300">Data de publicação</Th>
          <Th color="gray.300">Verificada?</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <Box>
              <Text
                color="purple.600"
                fontSize={['0.8rem', '0.9rem', '1rem']}
                fontWeight="bold"
              >
                O uso de medicamentos para o tratamento de cancer nos estágios
                mais avançados
              </Text>
            </Box>
          </Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>22-01-2022</Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']} color="green.500">
            True
          </Td>
        </Tr>
        <Tr>
          <Td>
            <Box>
              <Text
                color="purple.600"
                fontSize={['0.8rem', '0.9rem', '1rem']}
                fontWeight="bold"
              >
                O uso de medicamentos para o tratamento de cancer nos estágios
                mais avançados
              </Text>
            </Box>
          </Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>22-01-2022</Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>True</Td>
        </Tr>
        <Tr>
          <Td>
            <Box>
              <Text
                color="purple.600"
                fontSize={['0.8rem', '0.9rem', '1rem']}
                fontWeight="bold"
              >
                O uso de medicamentos para o tratamento de cancer nos estágios
                mais avançados
              </Text>
            </Box>
          </Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>22-01-2022</Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>True</Td>
        </Tr>
        <Tr>
          <Td>
            <Box>
              <Text
                color="purple.600"
                fontSize={['0.8rem', '0.9rem', '1rem']}
                fontWeight="bold"
              >
                O uso de medicamentos para o tratamento de cancer nos estágios
                mais avançados
              </Text>
            </Box>
          </Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>22-01-2022</Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>True</Td>
        </Tr>
        <Tr>
          <Td>
            <Box>
              <Text
                color="purple.600"
                fontSize={['0.8rem', '0.9rem', '1rem']}
                fontWeight="bold"
              >
                O uso de medicamentos para o tratamento de cancer nos estágios
                mais avançados
              </Text>
            </Box>
          </Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>22-01-2022</Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>True</Td>
        </Tr>
        <Tr>
          <Td>
            <Box>
              <Text
                color="purple.600"
                fontSize={['0.8rem', '0.9rem', '1rem']}
                fontWeight="bold"
              >
                O uso de medicamentos para o tratamento de cancer nos estágios
                mais avançados
              </Text>
            </Box>
          </Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>22-01-2022</Td>
          <Td fontSize={['0.8rem', '0.9rem', '1rem']}>True</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

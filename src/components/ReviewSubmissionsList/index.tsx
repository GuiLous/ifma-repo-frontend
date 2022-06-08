import {
  Button,
  Link,
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

interface Work {
  id: string;
  title: string;
  published_date: string;
  verified: boolean;
}

interface ReviewSubmissionsListProps {
  works: Work[];
}

export function ReviewSubmissionsList({ works }: ReviewSubmissionsListProps) {
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
              <Th color="gray.300">Status?</Th>
              <Th color="gray.300">Ação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {works?.map((work) => (
              <Tr key={work?.id}>
                <Td
                  color={work?.verified ? 'green.500' : 'yellow.500'}
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                >
                  {work?.verified ? (
                    <Link href={`/work-page/${work?.id}`}>{work?.title}</Link>
                  ) : (
                    <Text>{work?.title}</Text>
                  )}
                </Td>
                <Td fontSize={['0.8rem', '0.9rem', '1rem']}>
                  {work?.published_date}
                </Td>
                <Td
                  fontSize={['0.8rem', '0.9rem', '1rem']}
                  color={work?.verified ? 'green.500' : 'yellow.500'}
                >
                  {work?.verified ? 'Verificado' : 'Pendente'}
                </Td>
                <Td
                  fontSize={['0.8rem', '0.9rem', '1rem']}
                  color="purple.500"
                  fontWeight={600}
                >
                  <Button
                    as="a"
                    href={`/dashboard/review-page/${work?.id}`}
                    bg="White"
                    border="1px"
                    _hover={{
                      bg: 'purple.400',
                      color: 'White',
                      textDecor: 'none',
                    }}
                  >
                    <Text textAlign="center">Revisar</Text>
                  </Button>
                </Td>
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
                <Th color="gray.300">Status?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {works?.map((work) => (
                <Tr key={work?.id}>
                  <Td
                    color="purple.600"
                    fontSize={['0.8rem', '0.9rem', '1rem']}
                    fontWeight="bold"
                  >
                    <Link href={`/work-page/${work?.id}`}>{work?.title}</Link>
                  </Td>
                  <Td fontSize={['0.8rem', '0.9rem', '1rem']}>
                    {work?.published_date}
                  </Td>
                  <Td
                    fontSize={['0.8rem', '0.9rem', '1rem']}
                    color={work?.verified ? 'green.500' : 'yellow.500'}
                  >
                    {work?.verified ? 'Verificado' : 'Pendente'}
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

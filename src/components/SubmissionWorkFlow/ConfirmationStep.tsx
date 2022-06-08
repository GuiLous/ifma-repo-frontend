import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { SearchOptions } from '../../pages';
import { api } from '../../services/apiClient';

export function ConfirmationStep() {
  let courseData;
  let knowledgeData;
  const { getValues } = useFormContext();

  const [courses, setCourses] = useState<SearchOptions[]>(null);
  const [knowledges, setKnowledges] = useState<SearchOptions[]>(null);

  const {
    abstract,
    advisor,
    authors,
    course,
    date,
    emails,
    keyWords,
    knowledge,
    lattes,
    numPages,
    pdf,
    title,
  } = getValues();

  const published_date = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    api.get('/courses').then((response) => {
      setCourses(response.data);
    });
    api.get('/knowledgearea').then((response) => {
      setKnowledges(response.data);
    });
  }, []);

  if (courses !== null) {
    courseData = courses?.find((courseOption) => courseOption.id === course);
    knowledgeData = knowledges?.find(
      (knowledgeOption) => knowledgeOption.id === knowledge
    );
  }

  return (
    <Flex w="100%" mx="auto" maxWidth={1160} direction="column" mt="4" p="2">
      <Flex direction="column" gap="1" mb="6">
        <Heading
          textAlign="left"
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="green.400"
        >
          TÍTULO:
        </Heading>
        <Text
          border="1px"
          p="2"
          borderColor="green.200"
          color="gray.600"
          fontSize={['0.8rem', '0.9rem', '1rem']}
          bg="gray.50"
        >
          {title}
        </Text>
      </Flex>

      <Flex direction="column" gap="1" mb="6">
        <Heading
          textAlign="left"
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="green.400"
        >
          RESUMO:
        </Heading>
        <Text
          border="1px"
          p="2"
          borderColor="green.200"
          color="gray.600"
          fontSize={['0.8rem', '0.9rem', '1rem']}
          bg="gray.50"
        >
          {abstract}
        </Text>
      </Flex>

      <Flex
        direction={['column', 'column', 'row']}
        gap={['2', '4', '10']}
        align={['flex-start', 'flex-start', 'center']}
        justify="flex-start"
        mb={['3', '4', '0']}
      >
        <Stack direction="row" align="center" justify="flex-start">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Tipo de Obra:
          </Heading>
          <Text color="gray.600" fontSize={['0.8rem', '0.9rem', '1.1rem']}>
            Monografia (TCC)
          </Text>
        </Stack>

        <Stack direction="row" align="center" justify="flex-start">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Data Publicação:
          </Heading>
          <Text color="gray.600" fontSize={['0.8rem', '0.9rem', '1.1rem']}>
            {published_date}
          </Text>
        </Stack>
      </Flex>

      <Flex
        direction={['column', 'column', 'row']}
        gap={['2', '4', '10']}
        align={['flex-start', 'flex-start', 'center']}
        justify="flex-start"
        mb={['4', '6', '2']}
      >
        <Stack direction="row" align="center" justify="flex-start" mr="12">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Curso:
          </Heading>
          <Text color="gray.600" fontSize={['0.8rem', '0.9rem', '1.1rem']}>
            {courseData?.name}
          </Text>
        </Stack>

        <Stack direction="row" align="center" justify="flex-start">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Área de Conhecimento:
          </Heading>
          <Text color="gray.600" fontSize={['0.8rem', '0.9rem', '1.1rem']}>
            {knowledgeData?.name}
          </Text>
        </Stack>
      </Flex>

      <Flex
        direction={['column', 'column', 'row']}
        gap={['2', '4', '10']}
        align={['flex-start', 'flex-start', 'center']}
        justify="flex-start"
        mb={['4', '6', '2']}
      >
        <Stack direction="row" align="center" justify="flex-start" mr="12">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Número de Páginas:
          </Heading>
          <Text color="gray.600" fontSize={['0.8rem', '0.9rem', '1.1rem']}>
            {numPages}
          </Text>
        </Stack>
      </Flex>

      <Flex
        direction={['column', 'column', 'row']}
        gap={['2', '4', '10']}
        align={['flex-start', 'flex-start', 'center']}
        justify="flex-start"
        mb={['3', '4', '4']}
      >
        <Stack direction="row" align="center" justify="flex-start">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Orientador:
          </Heading>
          <Text color="gray.600" fontSize={['0.8rem', '0.9rem', '1.1rem']}>
            {advisor}
          </Text>
        </Stack>

        <Stack direction="row" align="center" justify="flex-start">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Lattes:
          </Heading>
          <Text color="gray.600" fontSize={['0.8rem', '0.9rem', '1.1rem']}>
            {lattes ? lattes : '-----'}
          </Text>
        </Stack>
      </Flex>

      <Flex
        direction={['column', 'column', 'row']}
        gap={['2', '4', '10']}
        align={['flex-start', 'flex-start', 'center']}
        justify="flex-start"
        mb="10"
      >
        <Stack w="100%" direction="row" align="center" justify="flex-start">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Palavras chave:
          </Heading>
          <Text
            w="100%"
            border="1px"
            p="2"
            borderColor="green.200"
            color="gray.600"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            bg="gray.50"
          >
            {keyWords?.map((key) => key.keyWord + ', ')}
          </Text>
        </Stack>
      </Flex>

      <Flex
        direction={['column', 'column', 'row']}
        gap={['2', '4', '10']}
        align={['flex-start', 'flex-start', 'center']}
        justify="flex-start"
        mb="20"
      >
        <Stack w="100%" direction="row" align="center" justify="flex-start">
          <Heading
            textAlign="left"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="green.400"
          >
            Arquivo PDf:
          </Heading>
          <Text
            w="100%"
            border="1px"
            p="2"
            borderColor="green.200"
            color="gray.600"
            fontSize={['0.8rem', '0.9rem', '1rem']}
            bg="gray.50"
          >
            {pdf[0].name}
          </Text>
        </Stack>
      </Flex>

      <Flex w="100%" direction="column" mb="4">
        <Heading
          textAlign="center"
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="green.400"
          mb={['3', '6', '8']}
        >
          Autores
        </Heading>
        <Table colorScheme="green" size="lg">
          <Thead>
            <Tr>
              <Th color="gray.300" w="100%" maxWidth="50%">
                Autor
              </Th>
              <Th color="gray.300" w="100%">
                Email
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {authors.map((value, index) => (
              <Tr key={value.author}>
                <Td
                  color="green.600"
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                >
                  <Text>{value?.author}</Text>
                </Td>
                <Td
                  color="green.600"
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                >
                  <Text>{emails[index]?.email}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
}

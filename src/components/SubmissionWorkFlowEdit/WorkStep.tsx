import { KeyboardEvent, useEffect, useState } from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';

import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DatePicker } from 'chakra-ui-date-input';

import { SearchOptions } from '../../pages';
import { api } from '../../services/apiClient';
import { Input as SubmissionInput } from './Input';

type keyWordField = {
  id: string;
  keyWord: string;
};

export function WorkStep() {
  const { control, register, watch } = useFormContext();

  const [courses, setCourses] = useState<SearchOptions[]>(null);
  const [knowledges, setKnowledges] = useState<SearchOptions[]>(null);

  const [keyWord, setKeyWord] = useState('');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'keyWords',
  });

  function handleInsert() {
    append({ keyWord });
    setKeyWord('');
  }

  function handleInsertEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      append({ keyWord });
      setKeyWord('');
    }
  }

  function handleRemoveKeyWord(keyWordToRemove: number) {
    remove(keyWordToRemove);
  }

  function handlePreventSubmission(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  useEffect(() => {
    api.get('/courses').then((response) => {
      setCourses(response.data);
    });
    api.get('/knowledgearea').then((response) => {
      setKnowledges(response.data);
    });
  }, []);

  const { course, knowledge, date: defaultDate } = watch();

  return (
    <Grid
      mt="8"
      mb="8"
      w="100%"
      gap={['6', '6', '4']}
      maxWidth={1160}
      templateColumns="repeat(3, 1fr)"
      mx="auto"
    >
      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={3}
      >
        <Heading
          as="label"
          htmlFor="title"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '31px']}
          py={['1px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Título da Obra
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <SubmissionInput
          id="title"
          name="title"
          type="text"
          color="purple.700"
          placeholder="Título da obra..."
          onKeyDown={handlePreventSubmission}
          {...register('title', { required: true })}
        />
      </GridItem>

      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={3}
      >
        <Heading
          as="label"
          htmlFor="course"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px="54px"
          py={['1px', '1px', '10px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Curso
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <Select
          id="course"
          name="course"
          variant="outline"
          border="1px"
          bg="White"
          color="purple.700"
          mb={['6', '6', '0']}
          mr={['0', '0', '3']}
          borderColor="gray.300"
          focusBorderColor="#4299e199"
          borderRadius="3"
          placeholder="Selecione uma opção"
          _placeholder={{ color: 'gray.300' }}
          fontSize={['0.6rem', '0.8rem', '1rem']}
          _hover={{ borderColor: 'green.200' }}
          value={course}
          {...register('course', { required: true })}
        >
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>

        <Heading
          as="label"
          htmlFor="knowledge"
          display={['block', 'block', 'inline']}
          fontSize={['0.7rem', '0.8rem', '0.9rem']}
          color="white"
          bg="green.400"
          px="14"
          py="2px"
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Área de Conhecimento
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <Select
          id="knowledge"
          name="knowledge"
          color="purple.700"
          variant="outline"
          border="1px"
          bg="White"
          borderColor="gray.300"
          focusBorderColor="#4299e199"
          borderRadius="3"
          placeholder="Selecione uma opção"
          _placeholder={{ color: 'gray.300' }}
          fontSize={['0.6rem', '0.8rem', '1rem']}
          _hover={{ borderColor: 'green.200' }}
          value={knowledge}
          {...register('knowledge', { required: true })}
        >
          {knowledges?.map((knowledge) => (
            <option key={knowledge.id} value={knowledge.id}>
              {knowledge.name}
            </option>
          ))}
        </Select>
      </GridItem>

      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={3}
      >
        <Heading
          as="label"
          htmlFor="date"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '32px']}
          py={['1px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Data de publicação
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              onChange={(date) => field.onChange(date)}
              borderRadius="0"
              mb={['6', '6', '0']}
              placeholder={defaultDate}
              color="purple.700"
            />
          )}
        />
        {/* <Input
          minWidth={150}
          borderColor="gray.300"
          _hover={{ borderColor: 'green.200' }}
          color="purple.700"
          type="date"
          display="inline"
          id="date"
          placeholder="dd-mm-yyyy"
          name="date"
          borderRadius="0"
          mr={['0', '0', '3']}
          mb={['6', '6', '0']}
          {...register('date', { required: true })}
        /> */}

        <Heading
          as="label"
          htmlFor="numPages"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '8']}
          py={['1px']}
          ml={['0', '0', '3']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          N. de páginas
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <Input
          minWidth={150}
          borderColor="gray.300"
          placeholder="Ex.: 100"
          _hover={{ borderColor: 'green.200' }}
          color="purple.700"
          type="number"
          display="inline"
          id="numPages"
          name="numPages"
          borderRadius="0"
          onKeyDown={handlePreventSubmission}
          {...register('numPages', { required: true })}
        />
      </GridItem>

      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={2}
      >
        <Heading
          as="label"
          htmlFor="locale"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '23px']}
          py={['1px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Local de publicação
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <SubmissionInput
          id="locale"
          name="locale"
          placeholder="Ex.: Caxias - MA"
          type="text"
          color="purple.700"
          onKeyDown={handlePreventSubmission}
          mr={['0', '0', '10']}
          mb={['4', '6', '0']}
          {...register('locale', { required: true })}
        />
      </GridItem>

      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={3}
        mb="6"
      >
        <Heading
          as="label"
          htmlFor="abstract"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '45px']}
          py={['51px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Resumo
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <Textarea
          resize="none"
          height="120px"
          placeholder="Escreva seu resumo..."
          borderColor="gray.300"
          _hover={{ borderColor: 'green.200' }}
          color="purple.700"
          display="inline"
          id="abstract"
          name="abstract"
          borderRadius="0"
          {...register('abstract', { required: true })}
        />
      </GridItem>

      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={2}
        mb="6"
      >
        <Heading
          as="label"
          htmlFor="pdf"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '44px']}
          py={['1px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Arquivo PDF
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <Input
          p="1"
          accept="pdf/*"
          minWidth={150}
          borderColor="gray.300"
          _hover={{ borderColor: 'green.200' }}
          color="purple.700"
          type="file"
          display="inline"
          id="pdf"
          name="pdf"
          borderRadius="0"
          mr={['0', '0', '3']}
          mb={['6', '6', '0']}
          {...register('pdf', { required: true })}
        />
      </GridItem>

      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="flex-start"
        colSpan={3}
      >
        <Table
          colorScheme="green"
          size="sm"
          mr={['0', '0', '10']}
          mb={['5', '5', '0']}
          bg="green.150"
          boxShadow="md"
        >
          <Thead>
            <Tr>
              <Th
                textAlign="center"
                bg="green.400"
                color="White"
                w="100%"
                maxWidth="80%"
                borderRight="4px"
              >
                PALAVRAS CHAVE
              </Th>
              <Th bg="green.400" color="White" textAlign="center">
                AÇÃO
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {fields?.map((field: keyWordField, index: number) => (
              <Tr key={field.id}>
                <Td
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                  textAlign="center"
                  color="purple.700"
                >
                  {field?.keyWord}
                </Td>
                <Td
                  fontSize={['0.8rem', '0.9rem', '1rem']}
                  textAlign="center"
                  color="purple.700"
                >
                  <Button
                    color="red.500"
                    variant="unstyled"
                    fontSize={['0.75rem', '0.9rem', '1rem']}
                    _hover={{ color: 'red.300' }}
                    onClick={() => handleRemoveKeyWord(index)}
                  >
                    remover
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Box w="100%" bg="green.150" boxShadow="md">
          <Heading
            fontSize={['0.8rem', '0.9rem', '1rem']}
            color="white"
            bg="green.400"
            mb={['1', '2', '0']}
            py="1"
            textAlign="center"
            w="100%"
          >
            Adicionar Palavra Chave
            <Text display="inline" pl="1" color="red.100">
              *
            </Text>
          </Heading>
          <HStack px="2" py="12px">
            <Input
              size="sm"
              borderColor="gray.200"
              placeholder="Ex.: palavra01"
              _hover={{ borderColor: 'green.200' }}
              color="purple.700"
              bg="White"
              display="inline"
              id="title"
              borderRadius="0"
              value={keyWord}
              onKeyDown={handleInsertEnter}
              onChange={(e) => setKeyWord(e.target.value)}
            />
            <Button
              isDisabled={keyWord === ''}
              onClick={handleInsert}
              colorScheme="teal"
              size="sm"
              fontSize={['0.75rem', '0.9rem', '1rem']}
            >
              Adicionar
            </Button>
          </HStack>
        </Box>
      </GridItem>
    </Grid>
  );
}

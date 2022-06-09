import { KeyboardEvent, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  Grid,
  GridItem,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Input as SubmissionInput } from './Input';

type AuthorField = {
  id: string;
  author: string;
};

type EmailsField = {
  id: string;
  email: string;
};

export function AuthorStep() {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const { control } = useFormContext();

  const {
    fields: authors,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'authors', // unique name for your Field Array
  });

  const {
    fields: emails,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'emails', // unique name for your Field Array
  });

  const emailsArray = emails.map((field: EmailsField) => field.email);

  function handleInsert() {
    appendAuthor({ author });

    if (email !== '') {
      appendEmail({ email });
    } else {
      appendEmail({ email: '-----' });
    }

    setAuthor('');
    setEmail('');
  }

  function handleRemoveAuthor(indexToRemove: number) {
    removeAuthor(indexToRemove);
    removeEmail(indexToRemove);
  }

  function handlePreventSubmission(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

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
        mb={['1', '2', '6']}
      >
        <Heading
          as="label"
          htmlFor="author"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '31px']}
          py={['1px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', '300px']}
          textAlign="center"
        >
          Nome do Autor
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <SubmissionInput
          id="author"
          name="author"
          placeholder="fulano de tal.."
          type="text"
          color="purple.700"
          mr={['0', '0', '10']}
          mb={['4', '6', '0']}
          value={author}
          onKeyDown={handlePreventSubmission}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Heading
          as="label"
          htmlFor="email"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '31px']}
          py={['1px', '1px', '10px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Email
        </Heading>

        <SubmissionInput
          id="email"
          name="email"
          type="text"
          color="purple.700"
          placeholder="Não sei..."
          value={email}
          onKeyDown={handlePreventSubmission}
          onChange={(e) => setEmail(e.target.value)}
        />
      </GridItem>

      <GridItem
        w="100%"
        colSpan={3}
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          onClick={handleInsert}
          isDisabled={author === ''}
          mb="20"
          colorScheme="teal"
        >
          Adicionar autor
        </Button>
      </GridItem>

      <GridItem
        bg="gray.300"
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={3}
        mb="3"
      >
        <Table colorScheme="green" size="sm" bg="green.150" boxShadow="md">
          <Thead>
            <Tr>
              <Th
                textAlign="center"
                bg="green.400"
                color="White"
                w="100%"
                maxWidth="70%"
                borderRight="4px"
              >
                AUTORES
              </Th>
              <Th
                textAlign="center"
                bg="green.400"
                color="White"
                w="100%"
                borderRight="4px"
              >
                Emails
              </Th>
              <Th bg="green.400" color="White" textAlign="center">
                AÇÃO
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {authors?.map((field: AuthorField, index) => (
              <Tr key={field.id}>
                <Td
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                  textAlign="center"
                  color="purple.700"
                >
                  {field.author}
                </Td>
                <Td
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                  textAlign="center"
                  color="purple.700"
                >
                  {emailsArray[index]}
                </Td>
                <Td textAlign="center" color="gray.700">
                  <Button
                    color="red.500"
                    variant="unstyled"
                    fontSize={['0.75rem', '0.9rem', '1rem']}
                    _hover={{ color: 'red.300' }}
                    onClick={() => handleRemoveAuthor(index)}
                  >
                    remover
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </GridItem>
    </Grid>
  );
}

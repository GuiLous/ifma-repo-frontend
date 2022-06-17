import { FormEvent, useState } from 'react';
import { useMutation } from 'react-query';

import {
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import Router from 'next/router';

import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';

type Work = {
  id: string;
  title: string;
  authors: string[];
  authors_emails: string[];
  advisor: string;
  advisor_lattes: string;
  published_date: string;
  published_local: string;
  resumo: string;
  palavras_chave: string[];
  number_pages: number;
  pdf_url: string;
  knowledge_area: string;
  course: string;
  user_id: string;
};

interface ReviewWorkProps {
  dataMonograph: Work;
}

export function ReviewWork({ dataMonograph }: ReviewWorkProps) {
  const toast = useToast();
  const [commentCorrection, setCommentCorrection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const review = useMutation(
    async () => {
      if (commentCorrection === '') {
        try {
          await api.put('/monographs/update-verified', {
            id: dataMonograph.id,
          });

          await api.post('/monographs/send-email', {
            user_id: dataMonograph?.user_id,
            statusMessage:
              'Submissão verificada e já pode ser encontrada no site!',
            titleSubmission: 'Submission title 01 teste',
          });

          Router.push('/dashboard');

          toast({
            title: 'Submissão verificada com sucesso!',
            position: 'top',
            status: 'success',
            isClosable: true,
            duration: 3000,
          });
        } catch (error) {
          toast({
            title: `${error.response.data.message}`,
            position: 'top',
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      } else {
        try {
          await api.put('/monographs/update-comments', {
            id: dataMonograph.id,
            commentToReview: commentCorrection,
          });

          await api.post('/monographs/send-email', {
            user_id: dataMonograph?.user_id,
            statusMessage:
              'Alguns campus necessitam serem corrigidos. Acesse: Meu Perfil -> Submissões Recusadas',
            titleSubmission: 'Submission title 01 teste',
          });

          Router.push('/dashboard');

          toast({
            title: 'Mensagem de correção enviada!',
            position: 'top',
            status: 'info',
            isClosable: true,
            duration: 3000,
          });
        } catch (error) {
          toast({
            title: `${error.response.data.message}`,
            position: 'top',
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('works-not-verified');
        queryClient.invalidateQueries('works-search');
        queryClient.invalidateQueries('works-verified');
        queryClient.invalidateQueries('works-not-verified-by-user');
      },
    }
  );

  const handleReview = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await review.mutateAsync();
    setIsSubmitting(false);
  };

  return (
    <Flex
      w="100%"
      as="form"
      mx="auto"
      maxWidth={1160}
      direction="column"
      mt="4"
      p="2"
      onSubmit={handleReview}
    >
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
          {dataMonograph?.title}
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
          {dataMonograph?.resumo}
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
            {dataMonograph?.published_date}
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
            {dataMonograph?.course}
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
            {dataMonograph?.knowledge_area}
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
            {dataMonograph?.number_pages}
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
            {dataMonograph?.advisor}
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
            {dataMonograph?.advisor_lattes}
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
            {dataMonograph?.palavras_chave.map((keyword, index) => {
              if (index === dataMonograph?.palavras_chave.length - 1) {
                return keyword;
              }

              return keyword + '; ';
            })}
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
            {dataMonograph.pdf_url}
          </Text>
        </Stack>
      </Flex>

      <Flex w="100%" direction="column" mb="10">
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
            {dataMonograph?.authors.map((author, index) => (
              <Tr key={author}>
                <Td
                  color="green.600"
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                >
                  <Text>{author}</Text>
                </Td>
                <Td
                  color="green.600"
                  fontSize={['0.7rem', '0.9rem', '1rem']}
                  fontWeight="bold"
                >
                  <Text>{dataMonograph?.authors_emails[index]}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>

      <Flex width="100%" justify="flex-end" mb="10" align="center" gap="6">
        <Textarea
          resize="none"
          placeholder="Escreva o que deve ser corrigido..."
          borderColor="gray.300"
          _hover={{ borderColor: 'green.200' }}
          color="gray.700"
          display="inline"
          defaultValue={commentCorrection}
          onChange={(e) => setCommentCorrection(e.target.value)}
          borderRadius="0"
        />
        <Button
          w={['80px', '100px', '120px']}
          fontSize={['0.75rem', '0.9rem', '1rem']}
          bg="red.400"
          color="White"
          _hover={{ bg: 'red.300' }}
          type="submit"
          isDisabled={commentCorrection === ''}
          isLoading={isSubmitting}
        >
          Corrigir
        </Button>
      </Flex>

      <Flex width="100%" align="center" justify="center">
        <Button
          isDisabled={commentCorrection !== ''}
          w={['80px', '100px', '160px']}
          fontSize={['0.75rem', '0.9rem', '1.2rem']}
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
        >
          Tudo certo!
        </Button>
      </Flex>
    </Flex>
  );
}

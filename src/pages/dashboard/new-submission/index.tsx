/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Flex, SlideFade, useDisclosure, useToast } from '@chakra-ui/react';
import Router from 'next/router';

import { HeaderDashboard } from '../../../components/HeaderDashboard';
import { SubmissionWorkFlow } from '../../../components/SubmissionWorkFlow';
import { AuthContext } from '../../../contexts/AuthContext';
import { api } from '../../../services/apiClient';
import { queryClient } from '../../../services/queryClient';
import { withSSRAuth } from '../../../utils/withSSRAuth';

type CreateWorkFormData = {
  abstract: string;
  advisor: string;
  authors: { author: string }[];
  course: string;
  date: string;
  emails: { email: string }[];
  keyWords: { keyWord: string }[];
  knowledge: string;
  lattes: string;
  locale: string;
  numPages: string;
  pdf: FileList;
  title: string;
};

export default function NewSubmission() {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const { isOpen, onToggle } = useDisclosure();
  const methods = useForm();

  useEffect(() => {
    onToggle();
  }, []);

  const createWork = useMutation(
    async (work: CreateWorkFormData) => {
      const formattedDate = work?.date.replaceAll('/', '-');
      const dateArray = formattedDate.split('-');
      const reverseDateArray = dateArray.reverse();
      const joinReverseDateArray = reverseDateArray.join('-');

      let keyWordsFormatted = '';
      keyWordsFormatted += work.keyWords.map((key) => key.keyWord);

      let authorsFormatted = '';
      authorsFormatted += work.authors.map((key) => key.author);

      let authorsEmailsFormatted = '';
      authorsEmailsFormatted += work.emails.map((key) => key.email);

      try {
        const response = await api.post('/monographs', {
          title: work.title,
          authors: authorsFormatted,
          authors_emails: authorsEmailsFormatted,
          advisor: work.advisor,
          advisor_lattes: work.lattes ? work.lattes : '-----',
          resumo: work.abstract,
          palavras_chave: keyWordsFormatted,
          number_pages: Number(work.numPages),
          published_date: new Date(joinReverseDateArray),
          published_local: work.locale,
          course_id: work.course,
          knowledge_id: work.knowledge,
        });

        if (user.isAdmin || user.isAdvisor) {
          await api.put('/monographs/update-verified', {
            id: response.data.id,
          });
        }

        const formData: any = new FormData();

        formData.append('pdf', work.pdf[0]);

        await api.patch(
          `/monographs/pdf-upload/${response.data.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        Router.push('/dashboard');

        if (user.isAdmin || user.isAdvisor) {
          toast({
            title: 'Submissão enviada com sucesso!',
            position: 'top',
            status: 'success',
            isClosable: true,
            duration: 3000,
          });
        } else {
          toast({
            title:
              'Submissão enviada com sucesso! Aguarde seu trabalho ser verificado para estar disponível no site. Te informaremos por email!',
            position: 'top',
            status: 'info',
            isClosable: true,
            duration: 3000,
          });
        }
      } catch (error) {
        toast({
          title: `${error.response.data.message}`,
          position: 'top',
          status: 'error',
          isClosable: true,
          duration: 3000,
        });
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

  const handleCreateWork: SubmitHandler<CreateWorkFormData> = async (
    values
  ) => {
    await createWork.mutateAsync(values);
  };

  return (
    <Flex w="100%">
      <title>New Submission | RepoIFMA</title>
      <Flex w="100%" direction="column">
        <SlideFade in={isOpen} offsetY="-100px">
          <HeaderDashboard
            headerTitle="Nova Submissão"
            sideBarPixelDif="0"
            buttonName="Meu Perfil"
            linkPath="/dashboard"
          />

          <FormProvider {...methods}>
            <Flex
              id="form-details"
              w="100%"
              bg="White"
              as="form"
              py={['8', '10', '12']}
              px={['2', '6', '10']}
              borderRadius="6"
              boxShadow="md"
              ml="auto"
              mr="2"
              flexDirection="column"
              onSubmit={methods.handleSubmit(handleCreateWork)}
            >
              <SubmissionWorkFlow />
            </Flex>
          </FormProvider>
        </SlideFade>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});

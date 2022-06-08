/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Flex, SlideFade, useDisclosure, useToast } from '@chakra-ui/react';
import Router from 'next/router';

import { HeaderDashboard } from '../../../components/HeaderDashboard';
import { SubmissionWorkFlowEdit } from '../../../components/SubmissionWorkFlowEdit';
import { AuthContext } from '../../../contexts/AuthContext';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';
import { queryClient } from '../../../services/queryClient';
import { withSSRAuth } from '../../../utils/withSSRAuth';

type EditWorkFormData = {
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
};

interface EditSubmissionProps {
  dataMonograph: Work;
}

export default function EditSubmission({ dataMonograph }: EditSubmissionProps) {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const { isOpen, onToggle } = useDisclosure();
  const methods = useForm();

  useEffect(() => {
    onToggle();
  }, []);

  const editWork = useMutation(
    async (work: EditWorkFormData) => {
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
          published_date: new Date(work.date),
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
          title: `${error.message}`,
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

  const handleEditWork: SubmitHandler<EditWorkFormData> = async (values) => {
    await editWork.mutateAsync(values);
  };

  return (
    <Flex w="100%">
      <title>Edit Submission | RepoIFMA</title>

      <Flex w="100%" direction="column">
        <SlideFade in={isOpen} offsetY="-100px">
          <HeaderDashboard
            headerTitle="Editar Submissão"
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
              onSubmit={methods.handleSubmit(handleEditWork)}
            >
              <SubmissionWorkFlowEdit />
            </Flex>
          </FormProvider>
        </SlideFade>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const { slug } = ctx.params;

  const { data } = await apiClient.get(`/monographs/not-verified/${slug}`);

  const dataMonograph = {
    id: data.id,
    title: data.title,
    authors: data.authors.split(','),
    authors_emails: data.authors_emails.split(','),
    advisor: data.advisor,
    advisor_lattes: data.advisor_lattes,
    published_date: new Date(data.published_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    published_local: data.published_local,
    resumo: data.resumo,
    palavras_chave: data.palavras_chave.split(','),
    number_pages: data.number_pages,
    pdf_url: data.pdf_url,
    knowledge_area: data.knowledge_area.name,
    course: data.course.name,
  };

  console.log(dataMonograph);
  return {
    props: { dataMonograph },
  };
});

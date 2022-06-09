/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import {
  Button,
  Flex,
  SlideFade,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Router from 'next/router';

import { HeaderDashboard } from '../../../components/HeaderDashboard';
import { SubmissionWorkFlowEdit } from '../../../components/SubmissionWorkFlowEdit';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';
import { queryClient } from '../../../services/queryClient';
import { formateDate } from '../../../utils/formatDate';
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
  const { isOpen, onToggle } = useDisclosure();

  const methods = useForm({
    defaultValues: {
      title: dataMonograph?.title,
      course: dataMonograph?.course,
      knowledge: dataMonograph?.knowledge_area,
      date: dataMonograph?.published_date,
      numPages: String(dataMonograph?.number_pages),
      locale: dataMonograph?.published_local,
      abstract: dataMonograph?.resumo,
      keyWords: dataMonograph?.palavras_chave.map((value) => {
        return { keyWord: value };
      }),
      authors: dataMonograph?.authors.map((value) => {
        return { author: value };
      }),
      emails: dataMonograph?.authors_emails.map((value) => {
        return { email: value };
      }),
      advisor: dataMonograph?.advisor,
      lattes: dataMonograph?.advisor_lattes,
    },
  });

  useEffect(() => {
    onToggle();
  }, []);

  const editWork = useMutation(
    async (work: EditWorkFormData) => {
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
        await api.put('/monographs/update', {
          id: dataMonograph?.id,
          title: work.title,
          authors: authorsFormatted,
          authors_emails: authorsEmailsFormatted,
          advisor: work.advisor,
          advisor_lattes: work.lattes ? work.lattes : '-----',
          published_date: new Date(joinReverseDateArray),
          published_local: work.locale,
          resumo: work.abstract,
          palavras_chave: keyWordsFormatted,
          number_pages: Number(work.numPages),
          knowledge_id: work.knowledge,
          course_id: work.course,
        });

        const formData: any = new FormData();
        formData.append('pdf', work.pdf[0]);

        await api.patch(
          `/monographs/pdf-upload/${dataMonograph?.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        await api.put('/monographs/update-comments', {
          id: `${dataMonograph?.id}`,
          commentToReview: '',
        });

        Router.push('/dashboard');
        toast({
          title:
            'Submissão Atualizada com sucesso! Aguarde seu trabalho ser verificado para estar disponível no site. Te informaremos por email!',
          position: 'top',
          status: 'info',
          isClosable: true,
          duration: 5000,
        });
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
    // console.log(values);
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
              <Button type="submit">submit</Button>
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
    published_date: formateDate(data.published_date),
    published_local: data.published_local,
    resumo: data.resumo,
    palavras_chave: data.palavras_chave.split(','),
    number_pages: data.number_pages,
    pdf_url: data.pdf_url,
    knowledge_area: data.knowledge_area.id,
    course: data.course.id,
  };

  return {
    props: { dataMonograph },
  };
});

/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';

import { Flex, SlideFade, useDisclosure } from '@chakra-ui/react';
import Router from 'next/router';

import { HeaderDashboard } from '../../../components/HeaderDashboard';
import { ReviewWork } from '../../../components/ReviewWork';
import { AuthContext } from '../../../contexts/AuthContext';
import { setupAPIClient } from '../../../services/api';
import { formateDate } from '../../../utils/formatDate';
import { withSSRAuth } from '../../../utils/withSSRAuth';

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

interface ReviewPageProps {
  dataMonograph: Work;
}

export default function ReviewPage({ dataMonograph }: ReviewPageProps) {
  const { user } = useContext(AuthContext);

  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    onToggle();
  }, []);

  if (user) {
    if (!user.isAdmin) {
      Router.push('/');
    }
  }

  return (
    <Flex w="100%">
      <title>Review Page | RepoIFMA</title>

      <Flex w="100%" direction="column">
        <SlideFade in={isOpen} offsetY="-100px">
          <HeaderDashboard
            headerTitle="Nova Submissão"
            sideBarPixelDif="0"
            buttonName="Meu Perfil"
            linkPath="/dashboard"
          />

          <Flex
            w="100%"
            bg="White"
            py={['8', '10', '12']}
            px={['2', '6', '10']}
            borderRadius="6"
            boxShadow="md"
            ml="auto"
            mr="2"
            flexDirection="column"
          >
            <ReviewWork dataMonograph={dataMonograph} />
          </Flex>
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
    knowledge_area: data.knowledge_area.name,
    course: data.course.name,
    user_id: data.user_id,
  };

  return {
    props: { dataMonograph },
  };
});

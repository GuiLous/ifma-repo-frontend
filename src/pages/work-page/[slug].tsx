import { useContext, useEffect } from 'react';

import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Slide,
  SlideFade,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import HeadingBar from '../../components/HeadingBar';
import { WorkInfos } from '../../components/WorkInfos';
import { AuthContext } from '../../contexts/AuthContext';
import { HideAndShowHeaderContext } from '../../contexts/HideAndShowHeaderContext';
import { api } from '../../services/apiClient';
import { formateDate } from '../../utils/formatDate';

export type Work = {
  title: string;
  authors: string;
  authors_emails: string;
  advisor: string;
  advisor_lattes: string;
  published_date: string;
  published_local: string;
  resumo: string;
  palavras_chave: string;
  number_pages: number;
  pdf_url: string;
  knowledge_area: string;
  course: string;
};

interface WorkProps {
  dataMonograph: Work;
}

export default function Work({ dataMonograph }: WorkProps) {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated } = useContext(AuthContext);
  const { navIsOpen } = useContext(HideAndShowHeaderContext);

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Box maxWidth={1180} mx="auto">
      <title>Obra | RepoIFMA</title>

      <Slide direction="top" in={navIsOpen} style={{ zIndex: 100 }}>
        <Header />
      </Slide>

      <SlideFade in={isOpen} offsetY="50px">
        <Flex
          as="main"
          w="100%"
          maxWidth={1180}
          bg="White"
          direction="column"
          mx="auto"
          mt={
            isAuthenticated
              ? ['5rem', '6.2rem', '7.5rem']
              : ['7rem', '11rem', '7.5rem']
          }
          pb={['2', '4', '6']}
          px={['2', '4', '6']}
          borderRadius="8"
          mb={['3', '3', '6']}
        >
          <HeadingBar textContent={dataMonograph.title} />

          <Flex
            w="100%"
            maxWidth={1100}
            mx="auto"
            flexDirection="column"
            align="center"
            justify="center"
            mb="10"
          >
            <Heading
              fontSize={['0.9rem', '1.2rem', '1.5rem']}
              fontWeight="500"
              color="green.1000"
              mb="2"
            >
              Resumo
            </Heading>

            <Text
              fontSize={['0.8rem', '0.9rem', '1rem']}
              fontWeight="500"
              color="gray.400"
              letterSpacing="tight"
              textAlign="justify"
              mb="8"
            >
              &nbsp;&nbsp;&nbsp; {dataMonograph.resumo}
            </Text>

            <Link
              href={`${dataMonograph.pdf_url}`}
              _hover={{ textDecoration: 'none' }}
              target="_blank"
            >
              <Button
                type="button"
                bg="gray.300"
                color="white"
                fontSize={['0.7rem', '0.9rem', '1rem']}
                variant="ghost"
              >
                Ver Arquivo Completo
              </Button>
            </Link>
          </Flex>

          <WorkInfos data={dataMonograph} />
        </Flex>
        <Footer />
      </SlideFade>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;

  const { data } = await api.get(`/monographs/monograph/${slug}`);

  const dataMonograph = {
    title: data.title,
    authors: data.authors,
    authors_emails: data.authors_emails,
    advisor: data.advisor,
    advisor_lattes: data.advisor_lattes,
    published_date: formateDate(data.published_date),
    published_local: data.published_local,
    resumo: data.resumo,
    palavras_chave: data.palavras_chave,
    number_pages: data.number_pages,
    pdf_url: data.pdf_url,
    knowledge_area: data.knowledge_area.name,
    course: data.course.name,
  };

  return {
    props: {
      dataMonograph,
    },
  };
};

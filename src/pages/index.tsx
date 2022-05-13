import { useContext, useState } from 'react';

import { Box, Flex, Slide, Spinner, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import AdvancedSearch from '../components/AdvancedSearch';
import Footer from '../components/Footer';
import { Header } from '../components/Header';
import HeadingBar from '../components/HeadingBar';
import { Pagination } from '../components/Pagination';
import { SearchBox } from '../components/SearchBox/SearchBox';
import { Sidebar } from '../components/Sidebar';
import SideSearch from '../components/SideSearch';
import WorksList from '../components/WorksList';
import { AuthContext } from '../contexts/AuthContext';
import { HideAndShowHeaderContext } from '../contexts/HideAndShowHeaderContext';
import { api } from '../services/apiClient';
import { useWorks } from '../services/hooks/useWorks';

type Work = {
  id: string;
  title: string;
  authors: string[];
  published_date: string;
};

export type SearchOptions = {
  id: string;
  name: string;
};

interface HomeProps {
  works: Work[];
  dataCourses: SearchOptions[];
  dataKnowledgeArea: SearchOptions[];
}

export default function Home({
  works,
  dataCourses,
  dataKnowledgeArea,
}: HomeProps) {
  const { isAuthenticated } = useContext(AuthContext);

  const { navIsOpen } = useContext(HideAndShowHeaderContext);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useWorks(page, {
    initialData: works,
  });

  return (
    <Box maxWidth={1180} mx="auto">
      <title>Home | RepoIFMA</title>

      <Slide direction="top" in={navIsOpen}>
        <Header />
      </Slide>

      <Flex
        as="main"
        direction={['column', 'column', 'row']}
        mx="auto"
        mt={
          isAuthenticated
            ? ['5rem', '6.2rem', '7.5rem']
            : ['7rem', '11rem', '7.5rem']
        }
        px={['2', '4', '6']}
        py={['2', '4', '6']}
        justify="space-between"
        bg="White"
        borderRadius="8"
        mb={['3', '3', '6']}
        gap={['2', '4']}
        boxShadow="lg"
      >
        <Flex width="100%" maxWidth={700} direction="column">
          <Text
            color="gray.400"
            fontWeight={600}
            fontSize={['0.6rem', '0.7rem']}
            mb={['2px', '4px']}
          >
            PESQUISA RÁPIDA
          </Text>

          <SearchBox />

          <HeadingBar textContent="OBRAS MAIS RECENTES" />

          {!isLoading && isFetching && (
            <Spinner size="sm" colorScheme="gray.500" ml="4" mb="4" />
          )}

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao carregar dados.</Text>
            </Flex>
          ) : (
            <>
              <WorksList works={data?.works} />
              <Pagination
                totalCountOfRegisters={data?.total_count}
                currentPage={page}
                totalRegisterPerPage={data?.works.length}
                onPageChange={setPage}
              />
            </>
          )}

          <HeadingBar textContent="PESQUISA AVANÇADA" />

          <AdvancedSearch
            dataCourses={dataCourses}
            dataKnowledgeArea={dataKnowledgeArea}
          />
        </Flex>

        <Flex
          w="100%"
          maxWidth={[700, 700, 400, 400]}
          direction={['column', 'column', 'column']}
          mt={['15px', '18px', '102px']}
          // pl={['1', '0', '6']}
          align="center"
        >
          <SideSearch
            items={dataCourses}
            queryType="course_id"
            title="Listar obras pelo Curso"
          />
          <SideSearch
            items={dataKnowledgeArea}
            queryType="knowledge_id"
            title="Listar obras pela Área do Conhecimento"
          />
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: dataCourses } = await api.get('/courses');
  const { data: dataKnowledgeArea } = await api.get('/knowledgearea');

  return {
    props: {
      dataCourses,
      dataKnowledgeArea,
    },
  };
};

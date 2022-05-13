import { useContext, useState } from 'react';

import { Box, Flex, SimpleGrid, Slide, Spinner, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import AdvancedSearch from '../../components/AdvancedSearch';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import HeadingBar from '../../components/HeadingBar';
import { Pagination } from '../../components/Pagination';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import WorksList from '../../components/WorksList';
import { AuthContext } from '../../contexts/AuthContext';
import { HideAndShowHeaderContext } from '../../contexts/HideAndShowHeaderContext';
import { api } from '../../services/apiClient';

import { SearchOptions } from '..';

import { useSearchWorks } from '../../services/hooks/useSearchWorks';

interface Work {
  id: string;
  title: string;
  authors: string[];
  published_date: string;
}

interface SearchProps {
  works: Work[];
  dataCourses: SearchOptions[];
  dataKnowledgeArea: SearchOptions[];
}

export type routerQueryParams = {
  title: string;
  author: string;
  advisor: string;
  palavras_chave: string;
  course_id: string;
  knowledge_id: string;
};

export default function Search({
  works,
  dataCourses,
  dataKnowledgeArea,
}: SearchProps) {
  const router = useRouter();

  const { isAuthenticated } = useContext(AuthContext);

  const { navIsOpen } = useContext(HideAndShowHeaderContext);
  const [page, setPage] = useState(1);

  const dataSearch = router.query as routerQueryParams;

  const { data, isLoading, isFetching, error } = useSearchWorks(
    page,
    dataSearch,
    {
      initialData: works,
    }
  );

  return (
    <Box maxWidth={1180} mx="auto">
      <title>Search | RepoIFMA</title>

      <Slide direction="top" in={navIsOpen}>
        <Header />
      </Slide>

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
        px={['2', '4', '6']}
        py={['2', '4', '6']}
        borderRadius="8"
        mb={['3', '3', '6']}
      >
        <SimpleGrid columns={[1, 1, 2]}>
          <Box>
            <Text
              color="gray.400"
              fontWeight={600}
              fontSize={['0.6rem', '0.7rem']}
              mb={['2px', '4px']}
            >
              PESQUISA RÁPIDA
            </Text>
            <SearchBox />
          </Box>
        </SimpleGrid>

        <HeadingBar textContent="Resultados da busca" />

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

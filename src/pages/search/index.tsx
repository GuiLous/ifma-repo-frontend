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
import { HideAndShowHeaderContext } from '../../context/HideAndShowHeaderContext';
import { api } from '../../services/apiClient';
import { useWorks } from '../../services/hooks/useWorks';
import { withSSRGuest } from '../../utils/withSSRGuest';

interface Work {
  id: string;
  title: string;
  authors: string[];
  published_date: string;
}

interface SearchProps {
  works: Work[];
}

type routerQueryParams = {
  title: string;
  author: string;
  advisor: string;
  keywords: string;
  course: string;
  knowledgeArea: string;
};

export default function Search({ works }: SearchProps) {
  const { navIsOpen } = useContext(HideAndShowHeaderContext);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useWorks(page, {
    initialData: works,
  });

  const router = useRouter();

  const { title, advisor, author, course, keywords, knowledgeArea } =
    router.query as routerQueryParams;

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
        mt={['5rem', '6.5rem', '7rem']}
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
              onPageChange={setPage}
              currentPage={page}
            />
          </>
        )}

        <HeadingBar textContent="PESQUISA AVANÇADA" />

        <AdvancedSearch />
      </Flex>
      <Footer />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(`/monographs/`);
  return {
    props: {},
  };
};

import { useContext, useEffect, useRef, useState } from 'react';

import {
  Box,
  Flex,
  Slide,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import AdvancedSearch from '../components/AdvancedSearch';
import Footer from '../components/Footer';
import { Header } from '../components/Header';
import HeadingBar from '../components/HeadingBar';
import { Pagination } from '../components/Pagination';
import { SearchBox } from '../components/SearchBox/SearchBox';
import SideSearch from '../components/SideSearch';
import WorksList from '../components/WorksList';
import { HideAndShowHeaderContext } from '../context/HideAndShowHeaderContext';
import { useWorks } from '../services/hooks/useWorks';

interface Work {
  id: string;
  title: string;
  authors: string[];
  published_date: string;
}

interface HomeProps {
  works: Work[];
}

export default function Home({ works }: HomeProps) {
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
        maxW={1180}
        direction={['column', 'column', 'row']}
        w="100%"
        mx="auto"
        mt={['5rem', '6.5rem', '7rem']}
        px={['2', '4', '6']}
        py={['2', '4', '6']}
        justify="space-between"
        bg="White"
        borderRadius="8"
        mb={['3', '3', '6']}
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
                onPageChange={setPage}
                currentPage={page}
              />
            </>
          )}

          <HeadingBar textContent="PESQUISA AVANÇADA" />

          <AdvancedSearch />
        </Flex>

        <Flex
          w="100%"
          maxWidth={[700, 700, 400, 400]}
          direction={['column', 'row', 'column']}
          mt={['15px', '18px', '102px']}
          px={['4', '0', '6']}
          align="center"
          justify={['initial', 'space-between', 'initial']}
        >
          <SideSearch />
          <SideSearch />
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';

import {
  Flex,
  SlideFade,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { HeaderDashboard } from '../../components/HeaderDashboard';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { SubmissionsList } from '../../components/SubmissionsList';
import { AuthContext } from '../../contexts/AuthContext';
import { useSearchWorks } from '../../services/hooks/useSearchWorks';

interface Work {
  id: string;
  title: string;
  published_date: string;
  verified: boolean;
}

interface AcceptsSubmissionsProps {
  works: Work[];
}

export default function AcceptsSubmissions({ works }: AcceptsSubmissionsProps) {
  const { isOpen, onToggle } = useDisclosure();
  const [page, setPage] = useState(1);

  const { user } = useContext(AuthContext);

  const dataSearch = {
    email: user?.email,
  };

  const { data, isLoading, isFetching, error } = useSearchWorks(
    page,
    dataSearch,
    {
      initialData: works,
    }
  );

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Flex w="100%">
      <Sidebar isOpenSlide={isOpen} />

      <Flex w="100%" direction="column">
        <SlideFade in={isOpen} offsetX="100px">
          <HeaderDashboard
            headerTitle="Submissões Verificadas"
            sideBarPixelDif="335px"
          />

          <Flex
            w="100%"
            bg="White"
            py={['8', '10', '12']}
            px={['2', '6', '10']}
            borderRadius="6"
            boxShadow="md"
            direction="column"
            ml="auto"
            mr="2"
            maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 335px)']}
          >
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
                <SubmissionsList works={data?.works} />
                <Pagination
                  totalCountOfRegisters={data?.total_count}
                  currentPage={page}
                  totalRegisterPerPage={data?.works.length}
                  onPageChange={setPage}
                />
              </>
            )}
          </Flex>
        </SlideFade>
      </Flex>
    </Flex>
  );
}

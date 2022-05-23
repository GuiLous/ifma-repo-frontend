/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import {
  Flex,
  SlideFade,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { HeaderDashboard } from '../../components/HeaderDashboard';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { SubmissionsRecusedList } from '../../components/SubmissionsRecusedList';
import { setupAPIClient } from '../../services/api';
import { useWorksRecused } from '../../services/hooks/useWorksRecused';

interface Work {
  id: string;
  title: string;
  published_date: string;
  comments_if_not_accept: string;
}

interface RecusedSubmissionsProps {
  works: Work[];
  user_email: string;
}

export default function RecusedSubmissions({
  user_email,
  works,
}: RecusedSubmissionsProps) {
  const { isOpen, onToggle } = useDisclosure();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useWorksRecused(
    page,
    user_email,
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
            headerTitle="Submissões Recusadas"
            sideBarPixelDif="335px"
          />

          <Flex
            w="100%"
            bg="White"
            as="form"
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
                <SubmissionsRecusedList works={data?.works} />
                <Pagination
                  totalCountOfRegisters={data?.total_count}
                  currentPage={page}
                  totalRegistersResponse={data?.works.length}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get('/users/profile');

  return {
    props: {
      user_email: data?.email,
    },
  };
};

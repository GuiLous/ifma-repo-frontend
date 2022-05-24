import { useEffect, useState } from 'react';

import {
  Flex,
  SlideFade,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { HeaderDashboard } from '../../../components/HeaderDashboard';
import { Pagination } from '../../../components/Pagination';
import { Sidebar } from '../../../components/Sidebar';
import { SubmissionsList } from '../../../components/SubmissionsList';
import { setupAPIClient } from '../../../services/api';
import { useWorksNotVerifiedUser } from '../../../services/hooks/useWorksNotVerifiedUser';

interface Work {
  id: string;
  title: string;
  published_date: string;
  verified: boolean;
}

interface PendentSubmissionsProps {
  works: Work[];
  user_email: string;
}

export default function PendentSubmissions({
  works,
  user_email,
}: PendentSubmissionsProps) {
  const { isOpen, onToggle } = useDisclosure();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useWorksNotVerifiedUser(
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
            headerTitle="Submissões em Análise"
            sideBarPixelDif="315px"
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
            maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 315px)']}
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

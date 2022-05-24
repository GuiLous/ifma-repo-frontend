import { useState } from 'react';

import { Flex, SlideFade, Spinner, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { setupAPIClient } from '../../services/api';
import { useUsers } from '../../services/hooks/useUsers';
import { HeaderDashboard } from '../HeaderDashboard';
import { Pagination } from '../Pagination';
import { TableUsersList } from './TableUsersList';

export type User = {
  id: string;
  fullName: string;
  email: string;
  isAdvisor: boolean;
  created_at: string;
};

interface AdminDashboardProps {
  isOpen?: boolean;
  users?: User[];
  admin_email: string;
}

export function AdminDashboard({
  isOpen,
  users,
  admin_email,
}: AdminDashboardProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page, admin_email, {
    initialData: users,
  });

  return (
    <Flex w="100%" direction="column">
      <SlideFade in={isOpen} offsetX="100px">
        <HeaderDashboard sideBarPixelDif="350px" headerTitle="Administrador" />

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
          maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 351px)']}
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
              <TableUsersList users={data?.users_list} />
              <Pagination
                totalCountOfRegisters={data?.total_count}
                currentPage={page}
                totalRegistersResponse={data?.users_list.length}
                onPageChange={setPage}
              />
            </>
          )}
        </Flex>
      </SlideFade>
    </Flex>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';

import { AdminDashboard } from '../../components/AdminDashboard';
import { ProfileDashboard } from '../../components/ProfileDashboard';
import { Sidebar } from '../../components/Sidebar';
import { AuthContext } from '../../contexts/AuthContext';
import { setupAPIClient } from '../../services/api';
import { withSSRAuth } from '../../utils/withSSRAuth';

interface DashboardProps {
  admin_email: string;
}

export default function Dashboard({ admin_email }: DashboardProps) {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Flex w="100%">
      <title>Dashboard | RepoIFMA</title>
      <Sidebar isOpenSlide={isOpen} />

      {user?.isAdmin ? (
        <AdminDashboard isOpen={isOpen} admin_email={admin_email} />
      ) : (
        <ProfileDashboard isOpen={isOpen} />
      )}
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get('/users/profile');

  return {
    props: {
      admin_email: data?.email,
    },
  };
});

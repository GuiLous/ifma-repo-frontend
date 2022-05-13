import { useContext, useEffect } from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';

import { AdminDashboard } from '../../components/AdminDashboard';
import { ProfileDashboard } from '../../components/ProfileDashboard';
import { Sidebar } from '../../components/Sidebar';
import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Flex w="100%">
      <Sidebar isOpenSlide={isOpen} />

      {user?.isAdmin ? (
        <AdminDashboard isOpen={isOpen} />
      ) : (
        <ProfileDashboard isOpen={isOpen} />
      )}
    </Flex>
  );
}

// export const getServerSideProps = withSSRGuest(async (_ctx) => {
//   return {
//     props: {},
//   };
// });

import { Flex, SlideFade } from '@chakra-ui/react';

import { HeaderDashboard } from '../HeaderDashboard';
import { TableUsersList } from './TableUsersList';

interface AdminDashboardProps {
  isOpen: boolean;
}

export function AdminDashboard({ isOpen }: AdminDashboardProps) {
  return (
    <Flex w="100%" direction="column">
      <SlideFade in={isOpen} offsetX="100px">
        <HeaderDashboard sideBarPixelDif="350px" headerTitle="Administrador" />

        <Flex
          w="100%"
          bg="White"
          align="flex-start"
          py={['8', '10', '12']}
          px={['2', '6', '10']}
          borderRadius="6"
          boxShadow="md"
          direction="column"
          ml="auto"
          maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 350px)']}
        >
          <TableUsersList />
        </Flex>
      </SlideFade>
    </Flex>
  );
}

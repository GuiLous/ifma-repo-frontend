import { RiPencilLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Link,
  SlideFade,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { HeaderAdminDashboard } from './HeaderAdminDashboard';
import { TableUsersList } from './TableUsersList';

interface AdminDashboardProps {
  isOpen: boolean;
}

export function AdminDashboard({ isOpen }: AdminDashboardProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex w="100%" direction="column">
      <SlideFade in={isOpen} offsetX="100px">
        <HeaderAdminDashboard />

        <Flex
          w="100%"
          bg="White"
          as="form"
          align="flex-start"
          py={['8', '10', '12']}
          px={['2', '6', '10']}
          borderRadius="6"
          boxShadow="md"
          direction="column"
        >
          <TableUsersList />
        </Flex>
      </SlideFade>
    </Flex>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { Flex, SlideFade, useDisclosure } from '@chakra-ui/react';

import { HeaderDashboard } from '../../components/HeaderDashboard';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { SubmissionsAcceptList } from '../../components/SubmissionsAcceptList';

export default function ReviewSubmissions() {
  const { isOpen, onToggle } = useDisclosure();
  const [page, setPage] = useState(1);

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
            <SubmissionsAcceptList />
            <Pagination
              totalCountOfRegisters={100}
              currentPage={page}
              totalRegisterPerPage={10}
              onPageChange={setPage}
            />
          </Flex>
        </SlideFade>
      </Flex>
    </Flex>
  );
}

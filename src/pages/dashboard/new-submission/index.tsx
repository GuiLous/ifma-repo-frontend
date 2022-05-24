/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { Flex, Grid, SlideFade, useDisclosure } from '@chakra-ui/react';

import { HeaderDashboard } from '../../../components/HeaderDashboard';
import { Pagination } from '../../../components/Pagination';
import { Sidebar } from '../../../components/Sidebar';
import { SubmissionsList } from '../../../components/SubmissionsList';

export default function NewSubmission() {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: SlideOpen, onToggle: onToggleSlide } = useDisclosure();

  const [page, setPage] = useState(1);

  useEffect(() => {
    onToggleSlide();
  }, []);

  return (
    <Flex w="100%">
      {/* <Sidebar isOpenSlide={isOpen} /> */}

      <Flex w="100%" direction="column">
        <SlideFade in={SlideOpen} offsetX="100px">
          <HeaderDashboard headerTitle="Nova Submissão" sideBarPixelDif="0" />

          <Flex
            w="100%"
            bg="White"
            as="form"
            py={['8', '10', '12']}
            px={['2', '6', '10']}
            borderRadius="6"
            boxShadow="md"
            ml="auto"
            mr="2"
          >
            <Grid></Grid>
          </Flex>
        </SlideFade>
      </Flex>
    </Flex>
  );
}

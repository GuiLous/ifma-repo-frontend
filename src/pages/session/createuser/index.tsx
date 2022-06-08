import { useEffect } from 'react';

import { Box, Flex, SlideFade, useDisclosure } from '@chakra-ui/react';

import { FormCreateUser } from '../../../components/FormCreateUser';
import { Header } from '../../../components/Header';

export default function CreateUser() {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Box h="100vh" maxWidth="1180" mx="auto">
      <title>Create User | RepoIFMA</title>

      <Header />

      <SlideFade in={isOpen} offsetY="50px">
        <Flex
          w="100%"
          maxWidth={1120}
          my={['10', '20', '20']}
          mx="auto"
          px={['2', '4', '6', '8']}
        >
          <FormCreateUser />
        </Flex>
      </SlideFade>
    </Box>
  );
}

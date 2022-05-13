import { Box, Flex } from '@chakra-ui/react';

import { FormCreateUser } from '../../../components/FormCreateUser';
import { Header } from '../../../components/Header';

export default function CreateUser() {
  return (
    <Box h="100vh" maxWidth="1180" mx="auto">
      <title>Create User | RepoIFMA</title>

      <Header />

      <Flex
        w="100%"
        maxWidth={1120}
        my={['10', '20', '20']}
        mx="auto"
        px={['2', '4', '6', '8']}
      >
        <FormCreateUser />
      </Flex>
    </Box>
  );
}

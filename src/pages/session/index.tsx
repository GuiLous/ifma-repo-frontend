import { Box, Flex } from '@chakra-ui/react';

import FormLogin from '../../components/FormLogin';
import { Header } from '../../components/Header';
import { withSSRGuest } from '../../utils/withSSRGuest';

export default function Login() {
  return (
    <>
      <Box h="100vh" maxWidth="1180" mx="auto">
        <title>Login | RepoIFMA</title>

        <Header />

        <Flex
          w="100%"
          my={['10', '20', '20']}
          maxWidth={550}
          mx="auto"
          px={['2', '4', '6', '8']}
        >
          <FormLogin />
        </Flex>
      </Box>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (_ctx) => {
  return {
    props: {},
  };
});

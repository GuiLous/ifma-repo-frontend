import { Box, Flex } from '@chakra-ui/react';

import Footer from '../../components/Footer';
import FormLogin from '../../components/FormLogin';
import { Header } from '../../components/Header';
import { DrawerExample } from '../../components/test';

export default function Login() {
  return (
    <Box maxWidth="1180" mx="auto">
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
      {/* <DrawerExample /> */}
      <Footer />
    </Box>
  );
}

// export const getServerSideProps = withSSRGuest(async (_ctx) => {
//   return {
//     props: {},
//   };
// });

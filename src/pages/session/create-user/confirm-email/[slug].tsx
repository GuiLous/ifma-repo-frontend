import { useEffect } from 'react';
import { useMutation } from 'react-query';

import {
  Box,
  Flex,
  Heading,
  Progress,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Header } from '../../../../components/Header';
import { api } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { withSSRGuest } from '../../../../utils/withSSRGuest';

export default function ConfirmEmail() {
  const toast = useToast();
  const router = useRouter();

  const { slug } = router.query;

  const confirmEmail = useMutation(
    async () => {
      try {
        await api.patch(`/users/confirm-email?token=${slug}`);

        router.push('/session');
        toast({
          title: 'Email confirmado com sucesso!',
          position: 'top',
          status: 'success',
          isClosable: true,
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: `${error.response.data.message}`,
          position: 'top',
          status: 'error',
          isClosable: true,
          duration: 3000,
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  useEffect(() => {
    confirmEmail.mutateAsync();
  }, []);

  return (
    <Box h="100vh" maxWidth="1180" mx="auto">
      <title>Confirm Email | RepoIFMA</title>

      <Header />

      <Flex
        direction="column"
        w="100%"
        maxWidth={1120}
        my={['10', '20', '20']}
        mx="auto"
        px={['2', '4', '6', '8']}
        py={['2', '4', '6', '8']}
        mt={['10', '15', '20']}
        bg="White"
        gap="10"
      >
        <Stack>
          <Heading
            textAlign="center"
            fontWeight={500}
            color="gray.400"
            fontSize={['0.8rem', '0.9rem', '1.3rem', '1.4rem']}
          >
            Confirmando seu email...
          </Heading>
          <Text
            textAlign="center"
            fontWeight={500}
            color="gray.600"
            fontSize={['0.7rem', '0.8rem', '1rem', '1.2rem']}
          >
            Aguarde!
          </Text>
        </Stack>
        <Progress size="md" isIndeterminate />
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withSSRGuest(async (_ctx) => {
  return {
    props: {},
  };
});

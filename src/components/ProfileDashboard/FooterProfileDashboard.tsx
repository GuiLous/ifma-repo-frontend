import { useContext, useState } from 'react';
import { useMutation } from 'react-query';

import { Button, Checkbox, Flex, Text, useToast } from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';

export function FooterProfileDashboard() {
  const toast = useToast();
  const { user, signOut } = useContext(AuthContext);

  const [isCheckDelete, setIsCheckDelete] = useState(false);

  const deleteUser = useMutation(
    async () => {
      try {
        await api.delete('/users/delete-user', {
          data: { email: user?.email },
        });

        await signOut();

        toast({
          title: 'Conta excluída com sucesso!',
          position: 'top',
          status: 'success',
          isClosable: true,
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: `${error.message}`,
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

  async function handleDeleteUser() {
    await deleteUser.mutateAsync();
  }

  return (
    <Flex
      bg="White"
      align="center"
      direction={['column', 'column', 'row']}
      py={['2', '4', '6']}
      px={['1', '4']}
      mt="6"
      justify="flex-start"
      borderRadius="6"
      w="100%"
      boxShadow="lg"
      ml="auto"
      mr="2"
      maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 330px)']}
    >
      <Text
        color="gray.500"
        fontWeight={400}
        fontSize={['md', 'xl', '2xl']}
        mr={['1', '4', '8']}
        mb={['2', '2', '0']}
      >
        Excluir Perfil?
      </Text>
      <Button
        type="button"
        color="red.300"
        borderColor="gray.200"
        _hover={
          isCheckDelete
            ? { bg: 'red.200', color: 'White', borderColor: 'red.200' }
            : {}
        }
        variant="outline"
        mr="3"
        mb={['2', '2', '0']}
        onClick={handleDeleteUser}
        isDisabled={!isCheckDelete}
      >
        Excluir
      </Button>
      <Checkbox
        isChecked={isCheckDelete}
        onChange={() => setIsCheckDelete(!isCheckDelete)}
      >
        <Text fontSize={['0.8rem', '0.9rem', '1rem']}>
          Desejo excluir minha conta.
        </Text>
      </Checkbox>
    </Flex>
  );
}

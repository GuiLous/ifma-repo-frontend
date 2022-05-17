import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Button, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';
import { Input } from './Input';

type UpdateUserFormData = {
  currentPassword: string;
  name: string;
  password: string;
  password_confirmation: string;
};

export const updateUserFormSchema = yup.object().shape({
  currentPassword: yup.string().required('Senha atual obrigatório'),
  name: yup.string().required('Nome Completo obrigatório'),
  password: yup
    .string()
    .notOneOf(
      [null, yup.ref('currentPassword')],
      'A nova senha não pode ser igual a anterior!'
    )
    .required('Senha obrigatória')
    .min(8, 'No mínimo 8 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export function Form() {
  const { user, signOut } = useContext(AuthContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const updateUser = useMutation(
    async (userValues: UpdateUserFormData) => {
      await api.put('/users/update-user', {
        email: user?.email,
        fullName: userValues.name,
        currentPassword: userValues.currentPassword,
        newPassword: userValues.password,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateUserFormSchema),
  });

  const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (
    values
  ) => {
    await updateUser.mutateAsync(values);
    await signOut();
  };

  return (
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
      ml="auto"
      mr="2"
      maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 330px)']}
      onSubmit={handleSubmit(handleUpdateUser)}
    >
      <Stack w="100%" spacing={['2', '5']}>
        <Input
          name="currentPassword"
          type="password"
          label="Senha atual"
          error={errors.currentPassword}
          placeholder="Digite sua senha atual..."
          {...register('currentPassword')}
        />

        <Input
          name="name"
          type="text"
          label="Nome completo"
          error={errors.name}
          placeholder="Digite algo caso deseje alterar..."
          defaultValue={user?.fullName}
          {...register('name')}
        />

        <Input
          name="email"
          type="email"
          label="E-mail"
          defaultValue={user?.email}
        />

        <Input
          name="password"
          type="text"
          label="Nova senha"
          error={errors.password}
          placeholder="Digite uma nova senha caso deseje alterar..."
          {...register('password')}
        />

        <Input
          name="password_confirmation"
          type="text"
          label="Confirmar nova senha"
          error={errors.password_confirmation}
          placeholder="Confirmar nova senha.."
          {...register('password_confirmation')}
        />
      </Stack>

      <Button
        type="submit"
        mt="8"
        size={isWideVersion ? 'lg' : 'md'}
        colorScheme="teal"
        isLoading={isSubmitting}
      >
        Salvar
      </Button>
    </Flex>
  );
}

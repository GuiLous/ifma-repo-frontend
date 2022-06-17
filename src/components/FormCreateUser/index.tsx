import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Box,
  Divider,
  Heading,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '../../services/apiClient';
import { Input } from '../FormLogin/Input';
import { FormButtons } from './FormButtons';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup
    .string()
    .required('Email Obrigatório')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^([a-z0-9]|[A-Z0-9])+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}([a-z0-9]|[A-Z0-9]))*@(ifma|(acad\.ifma))\.edu\.br$/,
      'O email deve terminar com: @ifma.edu.br ou @acad.ifma.edu.br'
    ),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export function FormCreateUser() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const handleClick = () => setShowPassword(!showPassword);

  const handleClickPasswordConfirmation = () =>
    setShowPasswordConfirmation(!showPasswordConfirmation);

  const createUser = async (user: CreateUserFormData) => {
    try {
      await api.post('/users', {
        email: user.email,
        password: user.password,
        fullName: user.name,
      });

      toast({
        title:
          'Enviamo um email para confirmarmos se esse email é válido. Por favor, verifique seu email!',
        position: 'top',
        status: 'info',
        isClosable: true,
        duration: 7000,
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
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser(values);
  };

  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      boxShadow="md"
      bg="White"
      py={['2', '6', '8']}
      px={['4', '8', '12']}
      onSubmit={handleSubmit(handleCreateUser)}
    >
      <Heading fontSize={['lg', 'xl', '2xl']} fontWeight="normal">
        Criar conta
      </Heading>

      <Divider my={['2', '4', '6']} borderColor="gray.700" />

      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="name"
            type="text"
            label="Nome"
            error={errors.name}
            {...register('name')}
          />

          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            show={showPassword}
            handleClick={handleClick}
            {...register('password')}
          />

          <Input
            name="password_confirmation"
            type="password"
            label="Confirmar senha"
            error={errors.password_confirmation}
            show={showPasswordConfirmation}
            handleClick={handleClickPasswordConfirmation}
            {...register('password_confirmation')}
          />
        </SimpleGrid>
      </VStack>

      <FormButtons isSubmitting={isSubmitting} />
    </Box>
  );
}

import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Box, Divider, Heading, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthContext } from '../../contexts/AuthContext';
import { queryClient } from '../../services/queryClient';
import FormButtons from './FormButtons';
import { Input } from './Input';

type LoginFormData = {
  email: string;
  password: string;
};

const loginUserFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email Obrigatório')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@(ifma|(acad\.ifma))\.edu\.br$/,
      'O email deve terminar com: @ifma.edu.br ou @acad.ifma.edu.br'
    ),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
});

export default function FormLogin() {
  const [show, setShow] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleClick = () => setShow(!show);

  const loginUser = useMutation(
    async (user: LoginFormData) => {
      const data = {
        email: user.email,
        password: user.password,
      };

      await signIn(data);
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
    resolver: yupResolver(loginUserFormSchema),
  });

  const handleLoginUser: SubmitHandler<LoginFormData> = async (values) => {
    await loginUser.mutateAsync(values);
  };

  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      bg="White"
      boxShadow="md"
      py={['2', '6', '8']}
      px={['4', '8', '12']}
      onSubmit={handleSubmit(handleLoginUser)}
    >
      <Heading
        textAlign={['center', 'initial']}
        fontSize={['lg', 'xl', '2xl']}
        fontWeight="normal"
      >
        Login
      </Heading>

      <Divider my={['2', '4', '4']} borderColor="gray.700" />

      <VStack spacing={['3', '5', '7']} mt={['4', '6', '8']}>
        <Input
          name="email"
          type="email"
          label="E-mail"
          error={errors.email}
          {...register('email')}
        />

        <Input
          name="password"
          type="password"
          label="Password"
          error={errors.password}
          show={show}
          handleClick={handleClick}
          {...register('password')}
        />
      </VStack>

      <FormButtons isSubmitting={isSubmitting} />
    </Box>
  );
}

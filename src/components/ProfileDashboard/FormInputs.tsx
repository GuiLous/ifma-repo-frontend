import { useContext } from 'react';

import { Flex } from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';
import { StackFormInput } from './StackFormInput';

interface FormInputsProps {
  setCurrentPassword: (value: string) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirmation: (value: string) => void;
}

export function FormInputs(data: FormInputsProps) {
  const { user } = useContext(AuthContext);

  return (
    <Flex w="100%" direction="column" gap="6">
      <StackFormInput
        label="Sua senha atual"
        placeholder="Digite sua senha..."
        setValue={data.setCurrentPassword}
      />
      <StackFormInput
        label="Nome"
        placeholder="Digite seu nome completo..."
        defaultValue={user?.fullName}
        setValue={data.setName}
      />
      <StackFormInput
        label="E-mail"
        placeholder="Digite um novo email se deseja alterar..."
        defaultValue={user?.email}
        setValue={data.setEmail}
      />
      <StackFormInput
        label="Nova senha"
        placeholder="Digite sua nova senha..."
        setValue={data.setPassword}
      />
      <StackFormInput
        label="Confirmar nova senha"
        placeholder="Confirme a nova senha..."
        setValue={data.setPasswordConfirmation}
      />
    </Flex>
  );
}

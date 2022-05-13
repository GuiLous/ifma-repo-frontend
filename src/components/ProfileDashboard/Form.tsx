import { useState } from 'react';

import { Button, Flex, useBreakpointValue } from '@chakra-ui/react';

import { FormInputs } from './FormInputs';

export function Form() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
      maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 330px)']}
    >
      <FormInputs
        setCurrentPassword={setCurrentPassword}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
      />

      <Button
        type="submit"
        mt="8"
        size={isWideVersion ? 'lg' : 'md'}
        colorScheme="teal"
      >
        Salvar
      </Button>
    </Flex>
  );
}

import { forwardRef, ForwardRefRenderFunction, useContext } from 'react';
import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useBreakpointValue,
} from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  defaultValue?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    type,
    label = '',
    placeholder = '',
    defaultValue,
    error = null,
    ...rest
  },
  ref
) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          mb="0"
          fontSize={['0.8rem', '0.9rem', '1rem']}
          htmlFor={name}
        >
          {label}
        </FormLabel>
      )}

      <ChakraInput
        name={name}
        id={name}
        type={type}
        focusBorderColor="green.300"
        variant="outline"
        borderRadius="3"
        color="gray.800"
        fontWeight="400"
        fontSize={['0.7rem', '0.9rem', '1.1rem']}
        size={isWideVersion ? 'lg' : 'md'}
        placeholder={placeholder}
        defaultValue={defaultValue}
        isDisabled={type === 'email' ? true : false}
        _hover={{
          bgColor: 'gray.50',
        }}
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);

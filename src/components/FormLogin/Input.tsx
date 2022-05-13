import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  RiEyeCloseLine,
  RiEyeLine,
  RiFileTextLine,
  RiLockPasswordLine,
  RiMessageLine,
} from 'react-icons/ri';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
  useBreakpointValue,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  show?: boolean;
  handleClick?: () => void;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, type, label, error = null, show = false, handleClick, ...rest },
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

      <InputGroup>
        <InputLeftElement width="2.5rem" pt={['0', '0', '2']}>
          {type === 'text' ? (
            <Icon as={RiFileTextLine} />
          ) : (
            <Icon as={type === 'email' ? RiMessageLine : RiLockPasswordLine} />
          )}
        </InputLeftElement>

        <ChakraInput
          name={name}
          id={name}
          type={show ? 'text' : type}
          focusBorderColor="green.200"
          bgColor="gray.50"
          variant="filled"
          borderRadius="3"
          color="gray.500"
          fontWeight="400"
          fontSize={['0.7rem', '0.9rem', '1.1rem']}
          size={isWideVersion ? 'lg' : 'md'}
          _hover={{
            bgColor: 'gray.100',
          }}
          ref={ref}
          {...rest}
        />

        {type === 'password' && (
          <InputRightElement width="2.5rem" pt={['0', '0', '2']}>
            <Icon
              as={show ? RiEyeLine : RiEyeCloseLine}
              onClick={handleClick}
              _hover={{ cursor: 'pointer' }}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);

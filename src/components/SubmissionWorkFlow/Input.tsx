import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

type AdvisorOptions = {
  id: string;
  fullName: string;
};

interface InputProps extends ChakraInputProps {
  name: string;
  id: string;
  type: string;
  error?: FieldError;
  dataOptions?: AdvisorOptions[];
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, id, type, dataOptions, ...rest },
  ref
) => {
  return (
    <>
      <ChakraInput
        list={dataOptions ? 'listAdvisors' : ''}
        borderColor="gray.300"
        _hover={{ borderColor: 'green.200' }}
        color="gray.700"
        display="inline"
        id={id}
        borderRadius="0"
        name={name}
        type={type}
        focusBorderColor="#4299e199"
        variant="outline"
        fontWeight="400"
        fontSize={['0.7rem', '0.9rem', '1.1rem']}
        size={'md'}
        autoComplete="off"
        ref={ref}
        {...rest}
      />

      {dataOptions && (
        <datalist id="listAdvisors">
          {dataOptions?.map((dataOption) => (
            <option key={dataOption.id} value={dataOption.fullName}>
              {dataOption.fullName}
            </option>
          ))}
        </datalist>
      )}
    </>
  );
};

export const Input = forwardRef(InputBase);

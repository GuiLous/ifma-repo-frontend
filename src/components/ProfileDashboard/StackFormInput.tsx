import { Heading, Input, Stack } from '@chakra-ui/react';

interface StackFormInputProps {
  label: string;
  placeholder: string;
  defaultValue?: string;
  setValue: (value: string) => void;
}

export function StackFormInput({
  label,
  placeholder,
  defaultValue = '',
  setValue,
}: StackFormInputProps) {
  return (
    <Stack as="label" w="100%" spacing="6px">
      <Heading
        color="gray.600"
        fontWeight={500}
        fontSize={['0.7rem', '0.7rem', '0.8rem']}
        textTransform="uppercase"
      >
        {label}:
      </Heading>
      <Input
        variant="unstyled"
        border="2px"
        borderColor="green.150"
        color="gray.700"
        py="2"
        px="4"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(event) => setValue(event.target.value)}
        _placeholder={{ color: 'gray.300' }}
        _focus={{
          boxShadow: '0 0 0 3px rgba(66, 153,225,0.6)',
          border: '1',
          borderColor: 'White',
        }}
      />
    </Stack>
  );
}

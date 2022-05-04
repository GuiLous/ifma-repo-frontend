import { Input } from '@chakra-ui/react';

interface InputSearchProps {
  placeHolder: string;
  setValue: (e: string) => void;
}

export default function InputSearch({
  placeHolder,
  setValue,
}: InputSearchProps) {
  return (
    <Input
      color="gray.600"
      variant="unstyled"
      px="1"
      placeholder={`Exemplo: ${placeHolder}`}
      _placeholder={{ color: 'gray.300' }}
      fontSize={['0.6rem', '0.8rem', '1rem']}
      position="initial"
      focusBorderColor="green.200"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

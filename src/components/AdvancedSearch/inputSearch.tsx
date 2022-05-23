import { Input, useBreakpointValue } from '@chakra-ui/react';

interface InputSearchProps {
  placeHolder: string;
  setValue: (e: string) => void;
}

export default function InputSearch({
  placeHolder,
  setValue,
}: InputSearchProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Input
      id="search"
      type="text"
      variant="outline"
      border="2px"
      bg="White"
      borderColor="green.150"
      focusBorderColor="#4299e199"
      borderRadius="3"
      color="gray.600"
      size={isWideVersion ? 'lg' : 'md'}
      placeholder={`Exemplo: ${placeHolder}`}
      _placeholder={{ color: 'gray.300' }}
      _hover={{ borderColor: 'green.200' }}
      fontSize={['0.6rem', '0.8rem', '1rem']}
      position="initial"
      onChange={(e) => setValue(e.target.value)}
    />
    // <Input
    //   color="gray.600"
    //   variant="unstyled"
    //   px="1"
    //   placeholder={`Exemplo: ${placeHolder}`}
    //   _placeholder={{ color: 'gray.300' }}
    //   fontSize={['0.6rem', '0.8rem', '1rem']}
    //   position="initial"
    //   focusBorderColor="green.200"
    //   onChange={(e) => setValue(e.target.value)}
    // />
  );
}

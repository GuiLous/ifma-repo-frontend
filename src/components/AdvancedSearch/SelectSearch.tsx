import { Select, useBreakpointValue } from '@chakra-ui/react';

import { SearchOptions } from '../../pages';

interface SelectSearchProps {
  setValue: (e: string) => void;
  dataOptions: SearchOptions[];
}

export default function SelectSearch({
  setValue,
  dataOptions,
}: SelectSearchProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Select
      color="gray.600"
      variant="outline"
      border="2px"
      bg="White"
      borderColor="green.150"
      focusBorderColor="#4299e199"
      borderRadius="3"
      _placeholder={{ color: 'gray.300' }}
      fontSize={['0.6rem', '0.8rem', '1rem']}
      defaultValue="todos"
      size={isWideVersion ? 'lg' : 'md'}
      _hover={{ borderColor: 'green.200' }}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="">Todos</option>
      {dataOptions?.map((dataOption) => (
        <option key={dataOption.id} value={dataOption.id}>
          {dataOption.name}
        </option>
      ))}
    </Select>
  );
}

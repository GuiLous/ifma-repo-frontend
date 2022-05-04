import { Select } from '@chakra-ui/react';

import { SearchOptions } from '../../pages';

interface SelectSearchProps {
  setValue: (e: string) => void;
  dataOptions: SearchOptions[];
}

export default function SelectSearch({
  setValue,
  dataOptions,
}: SelectSearchProps) {
  return (
    <Select
      color="gray.600"
      variant="unstyled"
      px="1"
      _placeholder={{ color: 'gray.300' }}
      fontSize={['0.6rem', '0.8rem', '1rem']}
      defaultValue="todos"
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="todos">Todos</option>
      {dataOptions?.map((dataOption) => (
        <option key={dataOption.id} value={dataOption.id}>
          {dataOption.name}
        </option>
      ))}
    </Select>
  );
}

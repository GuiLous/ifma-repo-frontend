import { Select } from '@chakra-ui/react';

interface SelectSearchProps {
  setValue: (e: string) => void;
}

export default function SelectSearch({ setValue }: SelectSearchProps) {
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
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
}

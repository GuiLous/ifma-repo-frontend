import { FormEvent, KeyboardEvent, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import Router from 'next/router';

export function SearchBox() {
  const [title, setTitle] = useState('');

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    Router.push(`/search?title=${title}`);

    setTitle('');
  }

  function handleEventInput(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      e.preventDefault();

      Router.push(`/search?title=${title}`);
      setTitle('');
    }
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <FormControl position="initial">
      <FormLabel
        color="gray.400"
        fontWeight={500}
        fontSize={['0.6rem', '0.8rem']}
        mb={['2px', '4px']}
        htmlFor={'search'}
      >
        Pesquisa rápida
      </FormLabel>

      <InputGroup>
        <Input
          id="search"
          type="text"
          variant="outline"
          border="2px"
          borderColor="green.150"
          focusBorderColor="#4299e199"
          borderRadius="3"
          color="gray.800"
          fontWeight="400"
          size={isWideVersion ? 'lg' : 'md'}
          placeholder="Buscar no repositório pelo título..."
          _placeholder={{ color: 'gray.200' }}
          _hover={{ borderColor: 'green.200' }}
          fontSize={['0.7rem', '0.9rem', '1rem']}
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          onKeyUp={handleEventInput}
          position="initial"
        />

        <InputRightElement width="2.5rem" pt={['0', '0', '2']}>
          <Icon
            aria-label="Search icon"
            as={RiSearchLine}
            _hover={{ color: 'gray.500', cursor: 'pointer' }}
            fontSize={['20', '23', '26']}
            onClick={handleSearch}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

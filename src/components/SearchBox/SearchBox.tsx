import { FormEvent, KeyboardEvent, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

import { Flex, Icon, Input } from '@chakra-ui/react';
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

  return (
    <Flex
      as="label"
      py={['2', '3']}
      px="2"
      w="100%"
      borderRadius="4"
      border="2px"
      borderColor="green.200"
    >
      <Input
        color="gray.600"
        variant="unstyled"
        mr="2"
        placeholder="Buscar no repositório pelo título..."
        _placeholder={{ color: 'gray.200' }}
        fontSize={['0.7rem', '0.9rem', '1rem']}
        position="initial"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        onKeyUp={handleEventInput}
      />
      <Icon
        aria-label="Search icon"
        as={RiSearchLine}
        _hover={{ color: 'gray.500', cursor: 'pointer' }}
        fontSize={['20', '23', '26']}
        onClick={handleSearch}
      />
    </Flex>
  );
}

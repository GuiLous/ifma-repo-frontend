import { RiSearchLine } from 'react-icons/ri';

import { Flex, Icon, Input } from '@chakra-ui/react';

export function SearchBox() {
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
        placeholder="Buscar no repositório..."
        _placeholder={{ color: 'gray.200' }}
        fontSize={['0.7rem', '0.9rem', '1rem']}
        position="initial"
      />
      <Icon
        as={RiSearchLine}
        _hover={{ color: 'gray.500', cursor: 'pointer' }}
        fontSize={['20', '24']}
      />
    </Flex>
  );
}

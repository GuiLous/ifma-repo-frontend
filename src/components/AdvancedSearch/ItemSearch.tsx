import { ReactNode } from 'react';

import { Flex, Heading, Stack } from '@chakra-ui/react';

interface ItemSearchProps {
  title: string;
  children: ReactNode;
}

export default function ItemSearch({ title, children }: ItemSearchProps) {
  return (
    <Stack as="label" spacing="1px">
      <Heading
        color="gray.300"
        fontWeight="normal"
        fontSize={['0.7rem', '0.7rem', '0.8rem']}
        textTransform="uppercase"
      >
        {title}:
      </Heading>
      <Flex
        flex="1"
        py="2"
        pl="2"
        w="100%"
        borderRadius="4"
        border="2px"
        borderColor="green.150"
        bg="White"
        _hover={{ borderColor: 'green.200' }}
      >
        {children}
      </Flex>
    </Stack>
  );
}

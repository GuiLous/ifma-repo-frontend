import {
  Box,
  Flex,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

interface SideSearchProps {
  title: string;
  items: string[];
}

export default function SideSearch() {
  return (
    <Flex w="100%" direction="column">
      <Flex
        mx="auto"
        w="100%"
        bg="teal"
        align="center"
        justify="center"
        px={['2', '4']}
        pt={['2', '4']}
        pb={['4', '8', '10']}
      >
        <Text
          color="White"
          fontWeight={500}
          fontSize={['0.7rem', '0.8rem', '1.2rem']}
          letterSpacing="0.05rem"
        >
          LISTAR OBRAS DO TIPO
        </Text>
      </Flex>
      <Flex
        w="100%"
        bg="green.150"
        align="center"
        justify="center"
        px={['2', '4']}
        py={['2', '4']}
        mb={['5', '8']}
      >
        <Box
          w="100%"
          bg="White"
          px={['2', '4']}
          py={['2', '3', '4']}
          borderRadius="8"
          mt={['-5', '-9', '-12']}
        >
          <UnorderedList
            spacing={['1', '3']}
            fontSize={['0.8rem', '0.9rem', '1rem']}
          >
            <Link href="/search?id=2">
              <ListItem>Ciências da Natureza</ListItem>
            </Link>
            <Link href="/search?id=2">
              <ListItem>Ciências da Natureza</ListItem>
            </Link>
            <Link href="/search?id=2">
              <ListItem>Ciências da Natureza</ListItem>
            </Link>
            <Link href="/search?id=2">
              <ListItem>Ciências da Natureza</ListItem>
            </Link>
            <Link href="/search?id=2">
              <ListItem>Ciências da Natureza</ListItem>
            </Link>
            <Link href="/search?id=2">
              <ListItem>Ciências da Natureza</ListItem>
            </Link>
          </UnorderedList>
        </Box>
      </Flex>
    </Flex>
  );
}

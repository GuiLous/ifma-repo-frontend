import {
  Box,
  Flex,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import { SearchOptions } from '../../pages';

interface SideSearchProps {
  items: SearchOptions[];
  title: string;
  queryType: string;
}

export default function SideSearch({
  items,
  title,
  queryType,
}: SideSearchProps) {
  return (
    <Flex w="100%" maxWidth={400} mt="1px" direction="column">
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
          fontSize={['0.8rem', '0.9rem', '1.2rem']}
          letterSpacing="0.05rem"
          align="center"
        >
          {title}
        </Text>
      </Flex>
      <Flex
        w="100%"
        bg="green.150"
        align="center"
        justify="center"
        px={['2', '4']}
        py={['2', '4']}
        mb={['2', '4']}
      >
        <Box
          w="100%"
          bg="White"
          px={['2', '4']}
          py={['2', '3', '4']}
          borderRadius="8"
          mt={['-5', '-9', '-12']}
        >
          <UnorderedList fontSize={['0.7rem', '0.8rem', '1rem']}>
            {items?.map((item) => (
              <Link key={item.id} href={`/search?${queryType}=${item.id}`}>
                <ListItem>{item.name}</ListItem>
              </Link>
            ))}
          </UnorderedList>
        </Box>
      </Flex>
    </Flex>
  );
}

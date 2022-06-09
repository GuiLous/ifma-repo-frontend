import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';

interface WorkItemProps {
  title: string;
  authors: string[];
  published_date: string;
}

export default function WorkItem({
  authors,
  published_date,
  title,
}: WorkItemProps) {
  return (
    <>
      <Heading
        color="green.1000"
        fontWeight={500}
        fontSize={['0.9rem', '0.9rem', '1.2rem']}
        mb={['2', '3']}
        _groupHover={{ textDecoration: 'underline' }}
      >
        {title}
      </Heading>

      <Flex
        align="flex-start"
        justify="space-between"
        color="gray.200"
        textTransform="uppercase"
      >
        <HStack spacing={['6', '8', '10']} align="flex-start">
          <Text color="gray.400" fontSize={['0.6rem', '0.7rem']}>
            AUTOR(ES)
          </Text>
          <VStack
            spacing="0.1rem"
            letterSpacing="tighter"
            lineHeight="1.2rem"
            align="baseline"
            color="gray.500"
            fontWeight="normal"
            fontSize={['0.8rem', '0.9rem']}
          >
            {authors.map((author) => (
              <Text key={author}>{author}</Text>
            ))}
          </VStack>
        </HStack>
        <Text color="gray.400" fontSize={['0.6rem', '0.7rem']}>
          {published_date}
        </Text>
      </Flex>
    </>
  );
}

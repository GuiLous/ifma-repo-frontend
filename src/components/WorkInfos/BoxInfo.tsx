import { GridItem, Heading, Text, VStack } from '@chakra-ui/react';

interface BoxInfoProps {
  title1: string;
  title2: string;
  title3?: string;
  content1: string;
  content2: string;
  content3?: string;
  columns: number;
  small?: boolean;
}
export function BoxInfo({
  title1,
  title2,
  title3,
  content1,
  content2,
  content3,
  columns,
  small,
}: BoxInfoProps) {
  return (
    <GridItem
      bg="green.100"
      rounded={8}
      px={['1', '2', '3']}
      colSpan={[3, columns]}
      py={['1', '2']}
    >
      <VStack align="initial" spacing="1">
        <Heading
          fontSize={['0.8rem', '0.9rem', '1rem']}
          fontWeight={600}
          color="gray.500"
          alignItems="center"
        >
          {title1}:
          <Text
            ml="1"
            display="inline"
            fontSize={small ? ['0.8rem', '1.rem'] : ['0.85rem', '1.05rem']}
            fontWeight={400}
            textTransform="uppercase"
          >
            {' '}
            {content1}
          </Text>
        </Heading>
        <Heading
          fontSize={['0.8rem', '0.9rem', '1rem']}
          fontWeight={600}
          color="gray.500"
          alignItems="center"
        >
          {title2}:
          <Text
            ml="1"
            display="inline"
            fontSize={small ? ['0.8rem', '1.rem'] : ['0.9rem', '1.05rem']}
            fontWeight={400}
            textTransform="uppercase"
          >
            {' '}
            {content2}
          </Text>
        </Heading>
        {title3 && (
          <Heading
            fontSize={['0.8rem', '0.9rem', '1rem']}
            fontWeight={600}
            color="gray.500"
            alignItems="center"
          >
            {title3}:
            <Text
              ml="1"
              display="inline"
              fontSize={small ? ['0.8rem', '1.rem'] : ['0.9rem', '1.05rem']}
              fontWeight={400}
              textTransform="uppercase"
            >
              {' '}
              {content3}
            </Text>
          </Heading>
        )}
      </VStack>
    </GridItem>
  );
}

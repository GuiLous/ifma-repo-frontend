import { RiArrowRightCircleLine, RiUserAddLine } from 'react-icons/ri';

import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Separator } from '../Separator';

export function LoginOrCreate() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      w={['200px', '350px']}
      direction={['column', 'column', 'row']}
      align="center"
      justify={['center', 'center', 'end']}
      mt={['3', '6', '0']}
    >
      <NextLink href="/session" passHref>
        <Link _hover={{ textDecoration: 'none' }}>
          <Flex
            color="green.400"
            _hover={{ color: 'green.300' }}
            align="center"
            justify="center"
          >
            <Icon fontSize={[15, 20]} as={RiArrowRightCircleLine} mr="1" />
            <Text fontWeight="500" fontSize={['0.7rem', '1rem']}>
              Fazer login
            </Text>
          </Flex>
        </Link>
      </NextLink>

      {isWideVersion && <Separator />}
      {!isWideVersion && <Box mb={['2', '4']} />}

      <NextLink href="/session/createuser" passHref>
        <Link
          border="1px"
          borderColor="gray.100"
          p="2"
          borderRadius="4"
          _hover={{ textDecoration: 'none', borderColor: 'gray.300' }}
        >
          <Flex
            color="gray.500"
            _hover={{ color: 'gray.300' }}
            align="center"
            justify="center"
          >
            <Icon fontSize={[15, 20]} as={RiUserAddLine} mr="1" />
            <Text fontWeight="500" fontSize={['0.7rem', '1rem']}>
              Criar uma conta
            </Text>
          </Flex>
        </Link>
      </NextLink>
    </Flex>
  );
}

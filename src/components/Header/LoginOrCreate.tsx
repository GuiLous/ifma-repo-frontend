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
    >
      <NextLink href="/session" passHref>
        <Link>
          <Flex
            color="green.400"
            _hover={{ color: 'green.600' }}
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

      <NextLink href="/" passHref>
        <Link>
          <Flex _hover={{ color: 'gray.500' }} align="center" justify="center">
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

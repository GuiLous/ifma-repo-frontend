import { useContext } from 'react';
import { RiArrowLeftCircleFill, RiMenuLine } from 'react-icons/ri';

import {
  Flex,
  Button,
  HStack,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react';

import { SidebarDrawerContext } from '../../contexts/SidebarDrawerContext';

export function HeaderProfileDashboard() {
  const { onOpen } = useContext(SidebarDrawerContext);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      bg="White"
      align="center"
      py={['4', '6']}
      px={['2', '4']}
      direction="row"
      justify="space-between"
      borderRadius="6"
      w="100%"
      mb="4"
      boxShadow="md"
      ml="auto"
      maxWidth={['100vw', '100vw', '100vw', 'calc(100vw - 330px)']}
    >
      <Text color="gray.500" fontWeight={400} fontSize={['md', 'xl', '2xl']}>
        Ajustes do Perfil
      </Text>

      <Flex align="center" justify="center">
        <Button
          fontSize={['sm', 'md', 'xl', 'xl']}
          color="green.300"
          _hover={{ color: 'green.200' }}
          variant="unstyled"
          mr={['0', '1', '2', '4']}
        >
          <HStack spacing="1" borderRight="1px" pr="3">
            <Icon fontSize={['20', '22']} as={RiArrowLeftCircleFill} />
            <Link href="/" display="inline">
              Voltar
            </Link>
          </HStack>
        </Button>
        {!isWideVersion && (
          <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine} />}
            fontSize={['24', '28', '29']}
            variant="unstyled"
            onClick={onOpen}
            mt="2"
          />
        )}
      </Flex>
    </Flex>
  );
}

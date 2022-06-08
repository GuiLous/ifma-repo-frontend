import { useContext } from 'react';
import { RiArrowLeftCircleFill, RiMenuLine } from 'react-icons/ri';

import {
  Flex,
  Button,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react';

import { SidebarDrawerContext } from '../contexts/SidebarDrawerContext';

interface HeaderDashboardProps {
  headerTitle: string;
  sideBarPixelDif?: string;
  buttonName?: string;
  linkPath?: string;
}

export function HeaderDashboard({
  headerTitle,
  sideBarPixelDif = '330px',
  buttonName = 'Página inicial',
  linkPath = '/',
}: HeaderDashboardProps) {
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
      mr="2"
      maxWidth={['100vw', '100vw', '100vw', `calc(100vw - ${sideBarPixelDif})`]}
    >
      <Text color="purple.500" fontWeight={700} fontSize={['md', 'xl', '2xl']}>
        {headerTitle}
      </Text>

      <Flex align="center" justify="center">
        <Link href={linkPath} alignItems="center">
          <Button
            fontSize={['sm', 'md', 'xl', 'xl']}
            color="green.300"
            _hover={{ color: 'green.200' }}
            variant="unstyled"
            mr={['0', '1', '2', '4']}
            display="flex"
            flexDirection="row"
            gap="1"
          >
            <Icon fontSize={['20', '22']} as={RiArrowLeftCircleFill} />
            <Text>{buttonName}</Text>
          </Button>
        </Link>
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

/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Collapse,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Box w="100%">
      <Button
        variant="unstyled"
        fontWeight={600}
        color="gray.400"
        pl="4"
        fontSize={['sm', 'md', 'lg']}
        w="100%"
        onClick={onToggle}
      >
        <HStack align="center" justify="space-between">
          <Text>{title}</Text>
          <Icon fontSize="3xl" as={RiArrowDropDownLine} />
        </HStack>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" mt="2" align="stretch">
          {children}
        </Stack>
      </Collapse>
    </Box>
  );
}

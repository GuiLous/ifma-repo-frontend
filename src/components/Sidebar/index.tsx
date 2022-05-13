import { useContext } from 'react';

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  SlideFade,
  useBreakpointValue,
} from '@chakra-ui/react';

import { SidebarDrawerContext } from '../../contexts/SidebarDrawerContext';
import { Logo } from '../Header/Logo';
import { SideBarNav } from './SideBarNav';

interface SidebarProps {
  isOpenSlide: boolean;
}

export function Sidebar({ isOpenSlide }: SidebarProps) {
  const { isOpen, onClose } = useContext(SidebarDrawerContext);

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody paddingInlineStart="unset">
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <SlideFade in={isOpenSlide} offsetX="-30px">
      <Box
        bg="White"
        as="aside"
        minW="300px"
        mr="6"
        pt="6"
        pr="2"
        borderRadius="4"
        boxShadow="lg"
        h="100vh"
        position="fixed"
      >
        <Box pl="3">
          <Logo />
        </Box>
        <SideBarNav />
      </Box>
    </SlideFade>
  );
}

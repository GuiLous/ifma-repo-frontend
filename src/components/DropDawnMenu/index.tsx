import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { SideBarNav } from './SideBarNav';

interface DropDawnMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DropDawnMenu({ isOpen, onClose }: DropDawnMenuProps) {
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

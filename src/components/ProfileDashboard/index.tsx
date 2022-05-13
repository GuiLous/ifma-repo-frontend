import { Flex, SlideFade } from '@chakra-ui/react';

import { HeaderDashboard } from '../HeaderDashboard';
import { FooterProfileDashboard } from './FooterProfileDashboard';
import { Form } from './Form';

interface ProfileDashboardProps {
  isOpen: boolean;
}

export function ProfileDashboard({ isOpen }: ProfileDashboardProps) {
  return (
    <Flex w="100%" direction="column">
      <SlideFade in={isOpen} offsetX="100px">
        <HeaderDashboard headerTitle="Ajustes do Perfil" />

        <Form />

        <FooterProfileDashboard />
      </SlideFade>
    </Flex>
  );
}

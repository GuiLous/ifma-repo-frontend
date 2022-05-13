import { Flex, SlideFade } from '@chakra-ui/react';

import { FooterProfileDashboard } from './FooterProfileDashboard';
import { Form } from './Form';
import { HeaderProfileDashboard } from './HeaderProfileDashboard';

interface ProfileDashboardProps {
  isOpen: boolean;
}

export function ProfileDashboard({ isOpen }: ProfileDashboardProps) {
  return (
    <Flex w="100%" direction="column">
      <SlideFade in={isOpen} offsetX="400px">
        <HeaderProfileDashboard />

        <Form />

        <FooterProfileDashboard />
      </SlideFade>
    </Flex>
  );
}

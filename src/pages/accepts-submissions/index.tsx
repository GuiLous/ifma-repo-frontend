import { useContext, useEffect } from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';

import { Sidebar } from '../../components/Sidebar';
import { AuthContext } from '../../contexts/AuthContext';

export default function AcceptsSubmissions() {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Flex w="100%">
      <Sidebar isOpenSlide={isOpen} />
    </Flex>
  );
}

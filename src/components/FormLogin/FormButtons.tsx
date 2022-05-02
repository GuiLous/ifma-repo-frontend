import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

interface FormButtonsProps {
  isSubmitting: boolean;
}

export default function FormButtons({ isSubmitting }: FormButtonsProps) {
  return (
    <Flex
      mt={['3', '6', '9']}
      justify={['space-between', 'flex-end', 'flex-end']}
    >
      <Link href="/" passHref>
        <Button
          mr={['0', '4']}
          as="a"
          bg="gray.400"
          color="White"
          fontSize={['0.7rem', '0.9rem', '1rem']}
          h={['30px', '40px']}
          w={['70px', '80px', '88px']}
        >
          Cancelar
        </Button>
      </Link>
      <Button
        type="submit"
        isLoading={isSubmitting}
        colorScheme="teal"
        fontSize={['0.7rem', '0.9rem', '1rem']}
        h={['30px', '40px']}
        w={['70px', '80px']}
      >
        Entrar
      </Button>
    </Flex>
  );
}

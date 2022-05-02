import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize={['sm', 'xs']}
        width="4"
        colorScheme="green.400"
        disabled
        _disabled={{
          bg: 'green.400',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      color="White"
      size="sm"
      fontSize={['sm', 'xs']}
      width="4"
      bg="gray.400"
      _hover={{
        bg: 'gray.300',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}

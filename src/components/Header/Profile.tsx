import { useContext } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useContext(AuthContext);
  return (
    <Flex align="center">
      {showProfileData && (
        <Box textAlign="right">
          <Text
            color="green.400"
            fontWeight={500}
            fontSize={['0.8rem', '0.8rem', '0.9rem', '1.1rem']}
            textTransform="uppercase"
          >
            {user.fullName}
          </Text>
          <Text
            fontSize={['0.6rem', '0.6rem', '0.7rem', '0.8rem']}
            textTransform="lowercase"
            color="gray.400"
          >
            {user.email}
          </Text>
        </Box>
      )}
    </Flex>
  );
}

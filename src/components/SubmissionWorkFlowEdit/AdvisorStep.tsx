import { KeyboardEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, GridItem, Heading, Text } from '@chakra-ui/react';

import { api } from '../../services/apiClient';
import { Input as SubmissionInput } from './Input';

export function AdvisorStep() {
  const [advisors, setAdvisors] = useState();
  const { register } = useFormContext();

  function handlePreventSubmission(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  useEffect(() => {
    api
      .get('/users/advisors')
      .then((response) => {
        setAdvisors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Grid
      mt="8"
      mb="8"
      w="100%"
      gap={['6', '6', '4']}
      maxWidth={1160}
      templateColumns="repeat(3, 1fr)"
      mx="auto"
    >
      <GridItem
        display="flex"
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        colSpan={3}
        mb={['1', '2', '6']}
      >
        <Heading
          as="label"
          htmlFor="advisor"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '31px']}
          py={['1px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', '300px']}
          textAlign="center"
        >
          Nome do Orientador
          <Text display="inline" pl="1" color="red.100">
            *
          </Text>
        </Heading>

        <SubmissionInput
          id="advisor"
          name="advisor"
          type="text"
          color="purple.700"
          placeholder="fulano de tal..."
          mr={['0', '0', '10']}
          mb={['4', '6', '0']}
          onKeyDown={handlePreventSubmission}
          dataOptions={advisors}
          {...register('advisor')}
        />

        <Heading
          as="label"
          htmlFor="lattes"
          display={['block', 'block', 'inline']}
          fontSize={['0.8rem', '0.9rem', '1rem']}
          color="white"
          bg="green.400"
          px={['2', '4', '31px']}
          py={['1px', '1px', '10px']}
          mr={['0', '0', '3']}
          mb={['1', '2', '0']}
          w={['100%', '100%', 'initial']}
          textAlign="center"
        >
          Lattes
        </Heading>

        <SubmissionInput
          id="lattes"
          name="lattes"
          color="purple.700"
          placeholder="Ex.: http://lattes.cnpq.br/00000000000"
          type="text"
          onKeyDown={handlePreventSubmission}
          {...register('lattes')}
        />
      </GridItem>
    </Grid>
  );
}

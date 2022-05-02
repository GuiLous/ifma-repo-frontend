import { Button, SimpleGrid } from '@chakra-ui/react';

import InputSearch from './inputSearch';
import ItemSearch from './ItemSearch';
import SelectSearch from './SelectSearch';

export default function AdvancedSearch() {
  return (
    <SimpleGrid
      as="form"
      columns={[1, 2]}
      gap={[4, 6]}
      bg="green.50"
      mt={['-2', '-5']}
      px={['2', '3']}
      py={['2', '3']}
    >
      <ItemSearch title="Título">
        <InputSearch placeHolder="Entrose de joelho" />
      </ItemSearch>
      <ItemSearch title="Autor">
        <InputSearch placeHolder="Guilherme Lourenço" />
      </ItemSearch>
      <ItemSearch title="Orientador">
        <InputSearch placeHolder="Guilherme Lourenço" />
      </ItemSearch>
      <ItemSearch title="Palavra(a) chave">
        <InputSearch placeHolder="IA; Cloud Computing" />
      </ItemSearch>
      <ItemSearch title="Curso">
        <SelectSearch />
      </ItemSearch>
      <ItemSearch title="Área de conhecimento">
        <SelectSearch />
      </ItemSearch>

      <Button
        w={['100%', '50%']}
        justifySelf="end"
        gridColumn={[1, 2]}
        colorScheme="teal"
        variant="solid"
        mt={['-1', '-3']}
        type="submit"
      >
        Buscar
      </Button>
    </SimpleGrid>
  );
}

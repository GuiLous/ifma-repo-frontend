import { FormEvent, useState } from 'react';

import { Button, SimpleGrid } from '@chakra-ui/react';
import Router from 'next/router';

import InputSearch from './inputSearch';
import ItemSearch from './ItemSearch';
import SelectSearch from './SelectSearch';

export default function AdvancedSearch() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [keywords, setKeywords] = useState('');
  const [course, setCourse] = useState('todos');
  const [knowledgeArea, setKnowledgeArea] = useState('todos');

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    Router.push(
      `/search?title=${title}&author=${author}&advisor=${advisor}&keywords=${keywords}&course=${course}&knowledgearea=${knowledgeArea}`
    );
  }

  return (
    <SimpleGrid
      as="form"
      columns={[1, 2]}
      gap={[4, 6]}
      bg="green.50"
      mt={['-2', '-5']}
      px={['2', '3']}
      py={['2', '3']}
      onSubmit={handleSearch}
    >
      <ItemSearch title="Título">
        <InputSearch setValue={setTitle} placeHolder="Entrose de joelho" />
      </ItemSearch>
      <ItemSearch title="Autor">
        <InputSearch setValue={setAuthor} placeHolder="Guilherme Lourenço" />
      </ItemSearch>
      <ItemSearch title="Orientador">
        <InputSearch setValue={setAdvisor} placeHolder="Guilherme Lourenço" />
      </ItemSearch>
      <ItemSearch title="Palavra(a) chave">
        <InputSearch setValue={setKeywords} placeHolder="IA; Cloud Computing" />
      </ItemSearch>
      <ItemSearch title="Curso">
        <SelectSearch setValue={setCourse} />
      </ItemSearch>
      <ItemSearch title="Área de conhecimento">
        <SelectSearch setValue={setKnowledgeArea} />
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

import { FormEvent, useState } from 'react';

import { Button, SimpleGrid } from '@chakra-ui/react';
import Router from 'next/router';

import { SearchOptions } from '../../pages';
import InputSearch from './inputSearch';
import ItemSearch from './ItemSearch';
import SelectSearch from './SelectSearch';

interface AdvancedSearchProps {
  dataCourses: SearchOptions[];
  dataKnowledgeArea: SearchOptions[];
}

export default function AdvancedSearch({
  dataCourses,
  dataKnowledgeArea,
}: AdvancedSearchProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [palavrasChave, setPalavrasChave] = useState('');
  const [course_id, setCourse_id] = useState('');
  const [knowledge_id, setKnowledge_id] = useState('');

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    Router.push(
      `/search?title=${title}&author=${author}&advisor=${advisor}&palavras_chave=${palavrasChave}&course_id=${course_id}&knowledge_id=${knowledge_id}`
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
        <InputSearch
          setValue={setPalavrasChave}
          placeHolder="IA; Cloud Computing"
        />
      </ItemSearch>
      <ItemSearch title="Curso">
        <SelectSearch dataOptions={dataCourses} setValue={setCourse_id} />
      </ItemSearch>
      <ItemSearch title="Área de conhecimento">
        <SelectSearch
          dataOptions={dataKnowledgeArea}
          setValue={setKnowledge_id}
        />
      </ItemSearch>

      <Button
        w={['100%', '50%']}
        justifySelf="end"
        gridColumn={[1, 2]}
        colorScheme="teal"
        variant="solid"
        mt={['-1', '-3']}
        type="submit"
        position="initial"
      >
        Buscar
      </Button>
    </SimpleGrid>
  );
}

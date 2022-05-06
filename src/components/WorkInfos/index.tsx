import { Grid } from '@chakra-ui/react';

import { Work } from '../../pages/work-page/[slug]';
import { BoxInfo } from './BoxInfo';

interface WorkInfosProps {
  data: Work;
}

export function WorkInfos({ data }: WorkInfosProps) {
  return (
    <Grid
      w="100%"
      gap="4"
      maxWidth={1100}
      templateColumns="repeat(3, 1fr)"
      mx="auto"
    >
      <BoxInfo
        title1="Tipo de Obra"
        title2="Área do Conhecimento"
        title3="Curso"
        content1="Monografia"
        content2={data.knowledge_area}
        content3={data.course}
        columns={2}
      />
      <BoxInfo
        title1="Local de Publicação"
        title2="Publicação"
        title3="N° Páginas"
        content1={data.published_local}
        content2={data.published_date}
        content3={String(data.number_pages)}
        columns={1}
      />
      <BoxInfo
        title1="Autor(es)"
        title2="Orientadores"
        content1={data.authors}
        content2={data.advisor}
        columns={3}
        small={true}
      />

      <BoxInfo
        title1="Palavras-chave"
        title2="Keywords"
        content1={data.palavras_chave}
        content2={data.keywords}
        columns={3}
        small={true}
      />
    </Grid>
  );
}

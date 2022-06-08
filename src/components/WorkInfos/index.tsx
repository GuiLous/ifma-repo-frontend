import { Grid } from '@chakra-ui/react';

import { Work } from '../../pages/work-page/[slug]';
import { BoxInfo } from './BoxInfo';

interface WorkInfosProps {
  data: Work;
}

export function WorkInfos({ data }: WorkInfosProps) {
  const authorsArray = data.authors.split(',');

  const authorsFormatted = authorsArray.map((value, index) => {
    if (index === authorsArray.length - 1) {
      return value;
    }

    return value + '; ';
  });

  const authorsEmails = data.authors_emails.split(',');

  const authorsEmailsFormatted = authorsEmails.map((value, index) => {
    if (index === authorsEmails.length - 1) {
      return value;
    }

    return value + '; ';
  });

  const palavrasChave = data.palavras_chave.split(',');

  const palavrasChaveFormatted = palavrasChave.map((value, index) => {
    if (index === palavrasChave.length - 1) {
      return value;
    }

    return value + '; ';
  });

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
        title2="Emails"
        content1={authorsFormatted}
        content2={authorsEmailsFormatted}
        columns={3}
        small={true}
      />

      <BoxInfo
        title1="Orientador"
        title2="Lattes"
        content1={data.advisor}
        content2={data.advisor_lattes}
        columns={3}
        small={true}
      />

      <BoxInfo
        title1="Palavras-chave"
        content1={palavrasChaveFormatted}
        columns={3}
        small={true}
      />
    </Grid>
  );
}

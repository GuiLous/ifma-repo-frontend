import { Grid } from '@chakra-ui/react';

import { BoxInfo } from './BoxInfo';

export function WorkInfos() {
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
        title2="Classificação Temática"
        title3="Ano"
        content1="TCC"
        content2="PSICOLOGIA"
        content3="2021"
        columns={2}
      />
      <BoxInfo
        title1="Publicação"
        title2="N° Páginas"
        content1="02-05-2022"
        content2="76"
        columns={1}
      />
      <BoxInfo
        title1="Autor(es)"
        title2="Orientadores"
        content1="ALCILENE DA SILVA MOREIRA, NICIANE FONSECA DE CASTRO"
        content2="M.Sc. SILENE MOREIRA DE SOUZA"
        columns={3}
        small={true}
      />

      <BoxInfo
        title1="Palavras-chave"
        title2="Keywords"
        content1="Depressão;depressão perinatal;gestação;pré-natal psicológico;psicoprofilaxia;"
        content2="Depression;perinatal depression;pregnancy;Psychological prenatal care;psychoprophylaxis"
        columns={3}
        small={true}
      />
    </Grid>
  );
}

import { useContext } from 'react';

import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Slide,
  Text,
} from '@chakra-ui/react';

import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import HeadingBar from '../../components/HeadingBar';
import { WorkInfos } from '../../components/WorkInfos';
import { HideAndShowHeaderContext } from '../../context/HideAndShowHeaderContext';

export default function Work() {
  const { navIsOpen } = useContext(HideAndShowHeaderContext);
  return (
    <Box maxWidth={1180} mx="auto">
      <title>Search | RepoIFMA</title>

      <Slide direction="top" in={navIsOpen}>
        <Header />
      </Slide>

      <Flex
        as="main"
        w="100%"
        maxWidth={1180}
        bg="White"
        direction="column"
        mx="auto"
        mt={['5rem', '6.5rem', '7rem']}
        pb={['2', '4', '6']}
        px={['2', '4', '6']}
        borderRadius="8"
        mb={['3', '3', '6']}
      >
        <HeadingBar textContent="Tema do tcc" />

        <Flex
          w="100%"
          maxWidth={1100}
          mx="auto"
          flexDirection="column"
          align="center"
          justify="center"
          mb="10"
        >
          <Heading
            fontSize={['0.9rem', '1.2rem', '1.5rem']}
            fontWeight="500"
            color="green.1000"
            mb="2"
          >
            Resumo
          </Heading>

          <Text
            fontSize={['0.8rem', '0.9rem', '1rem']}
            fontWeight="500"
            color="gray.400"
            letterSpacing="tight"
            textAlign="justify"
            mb="8"
          >
            &nbsp;&nbsp;&nbsp; A desigualdade hídrica no Brasil é uma discussão
            de anos, na verdade trata-se de um problema histórico e estrutural,
            sobretudo, em razão da grande oferta de água em regiões distantes
            dos grandes centros consumidores deste recurso. Com interesse de
            apaziguar tal situação, desenvolveu-se o Projeto de Integração do
            Rio São Francisco, o qual visa levar água às regiões escassas do
            Nordeste Setentrional. A crise hídrica enfrentada por Campina Grande
            - PB, resultou em maior rapidez na construção do canal,
            correspondente ao trecho Leste, o que promoveu no surgimento de
            distúrbios na estrutura de maneira precoce. Portanto, o presente
            trabalho buscou analisar as características de eventuais
            manifestações patológicas presentes em um trecho do canal do Eixo
            Leste do Rio São Francisco, em Monteiro - PB. Esta temática,
            fundamentou-se na compreensão dos tipos de canais artificiais, na
            formulação do Projeto de Integração do Rio São Francisco e efetuação
            de uma pesquisa aprofundada no trecho específico escolhido. Nesta
            perspectiva, realizou-se um estudo de caso de cunho exploratório e
            qualitativo, dividindo-se em quatro etapas principais: pesquisa de
            campo, pesquisa documental, vistorias e inspeções e medidas
            corretivas. Na coleta de dados “in loco”, adotou-se o check-list das
            impropriedades encontradas, tabulando-se de acordo com a
            caracterização de cada uma, como: a sua causa, classificação, grau
            de criticidade e as possíveis medidas corretivas para manifestações
            identificadas. Deste modo, encontrou-se cerca de 6 não
            conformidades, que repetem-se com maior frequência ao longo do
            canal, obtidas através do mapeamento do fragmento, destacando que,
            grande parte dessas avarias configuram-se como anomalias, advindas
            de erros de concepção, execução ou utilização. Vale salientar que, a
            partir de patologias simples surgem agravamentos que comprometem o
            funcionamento ou até mesmo a estrutura. Todavia, a adoção de um
            plano de manutenção no canal é fundamental para prevenir o
            surgimento de novas manifestações patológicas e ajustes mais rápidos
            de correção das impropriedades encontradas. ut lab
          </Text>

          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <Button
              type="button"
              bg="gray.300"
              color="white"
              fontSize={['0.7rem', '0.9rem', '1rem']}
              variant="ghost"
            >
              Ver Arquivo Completo
            </Button>
          </Link>
        </Flex>

        <WorkInfos />
      </Flex>
      <Footer />
    </Box>
  );
}

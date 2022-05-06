import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import WorkItem from './WorkItem';

interface Work {
  id: string;
  title: string;
  authors: string[];
  published_date: string;
}

interface WorksListProps {
  works: Work[];
}

export default function WorksList({ works }: WorksListProps) {
  return (
    <>
      {works?.map((work) => (
        <NextLink key={work.id} href={`/work-page/${work.id}`} passHref>
          <Link _hover={{ textDecoration: 'none' }} role="group" mb="1">
            <Box
              w="100%"
              px={['2', '3']}
              py={['2', '3']}
              bg="green.100"
              borderRadius="5"
            >
              <WorkItem
                authors={work.authors}
                title={work.title}
                published_date={work.published_date}
              />
            </Box>
          </Link>
        </NextLink>
      ))}
    </>
  );
}

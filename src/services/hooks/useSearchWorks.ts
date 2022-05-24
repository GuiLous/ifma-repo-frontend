import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { routerQueryParams } from '../../pages/search';
import { api } from '../apiClient';

type Work = {
  id: string;
  title: string;
  authors: string[];
  published_date: string;
  verified: boolean;
};

type GetWorksResponse = {
  works: Work[];
  total_count: number;
};

export async function getWorksFiltered(
  page: number,
  dataSearch: routerQueryParams
): Promise<GetWorksResponse> {
  const params = {
    title: dataSearch?.title,
    author: dataSearch?.author,
    advisor: dataSearch?.advisor,
    palavras_chave: dataSearch?.palavras_chave,
    course_id: dataSearch?.course_id,
    knowledge_id: dataSearch?.knowledge_id,
    user_email: dataSearch?.user_email,
  };

  const { data } = await api.get(`/monographs/search/${page}`, { params });

  const { total_count, monographs } = data;

  const works = monographs.map((monograph) => {
    return {
      id: monograph.id,
      title: monograph.title,
      authors: monograph.authors.split(','),
      published_date: new Date(monograph.published_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }
      ),
      verified: monograph.verified,
    };
  });

  return {
    works,
    total_count,
  };
}

export function useSearchWorks(
  page: number,
  dataSearch: routerQueryParams | null,
  options: UseQueryOptions
) {
  return useQuery(
    ['works-search', page, dataSearch],
    () => getWorksFiltered(page, dataSearch),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    }
  ) as UseQueryResult<GetWorksResponse, unknown>;
}

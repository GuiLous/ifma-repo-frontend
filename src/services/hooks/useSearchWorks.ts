import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { api } from '../apiClient';

type Work = {
  id: string;
  title: string;
  authors: string[];
  published_date: string;
};

type GetWorksResponse = {
  works: Work[];
  total_count: number;
};

export async function getWorksFiltered(
  page: number
): Promise<GetWorksResponse> {
  const { data } = await api.get(`/monographs/${page}`);

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
    };
  });

  return {
    works,
    total_count,
  };
}

export function useSearchWorks(page: number, options: UseQueryOptions) {
  return useQuery(['works', page], () => getWorksFiltered(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetWorksResponse, unknown>;
}

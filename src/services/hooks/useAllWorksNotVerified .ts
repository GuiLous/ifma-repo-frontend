import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { formateDate } from '../../utils/formatDate';
import { api } from '../apiClient';

type Work = {
  id: string;
  title: string;
  published_date: string;
  verified: boolean;
};

type GetWorksResponse = {
  works: Work[];
  total_count: number;
};

export async function getWorks(page: number): Promise<GetWorksResponse> {
  try {
    const { data } = await api.get(`/monographs/all/not-verified/${page}`);

    const { total_count, monographs } = data;

    const works = monographs.map((monograph) => {
      return {
        id: monograph.id,
        title: monograph.title,
        published_date: formateDate(monograph.published_date),
        verified: monograph.verified,
      };
    });

    return {
      works,
      total_count,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export function useAllWorksNotVerified(page: number, options: UseQueryOptions) {
  return useQuery(['works-not-verified', page], () => getWorks(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetWorksResponse, unknown>;
}

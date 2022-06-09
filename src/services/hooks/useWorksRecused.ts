import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { formateDate } from '../../utils/formatDate';
import { api } from '../apiClient';

type Work = {
  id: string;
  title: string;
  published_date: string;
  comments_if_not_accept: string;
};

type GetWorksResponse = {
  works: Work[];
  total_count: number;
};

export async function getWorks(
  page: number,
  user_email?: string
): Promise<GetWorksResponse> {
  const params = { user_email };

  try {
    const { data } = await api.get(`/monographs/all/recused/${page}`, {
      params,
    });

    const { total_count, monographs } = data;

    const works = monographs.map((monograph) => {
      return {
        id: monograph.id,
        title: monograph.title,
        published_date: formateDate(monograph.published_date),
        comments_if_not_accept: monograph.comments_if_not_accept,
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

export function useWorksRecused(
  page: number,
  options: UseQueryOptions,
  user_email?: string
) {
  return useQuery(
    ['works-recused', page, user_email],
    () => getWorks(page, user_email),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    }
  ) as UseQueryResult<GetWorksResponse, unknown>;
}

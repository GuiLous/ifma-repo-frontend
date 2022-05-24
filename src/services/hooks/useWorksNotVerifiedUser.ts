import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

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

export async function getWorks(
  page: number,
  user_email: string
): Promise<GetWorksResponse> {
  const params = { user_email };

  const { data } = await api.get(`/monographs/all/not-verified/user/${page}`, {
    params,
  });

  const { total_count, monographs } = data;

  const works = monographs.map((monograph) => {
    return {
      id: monograph.id,
      title: monograph.title,
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

export function useWorksNotVerifiedUser(
  page: number,
  user_email: string,
  options: UseQueryOptions
) {
  return useQuery(
    ['works-not-verified-by-user', page, user_email],
    () => getWorks(page, user_email),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    }
  ) as UseQueryResult<GetWorksResponse, unknown>;
}

import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { api } from '../apiClient';

type User = {
  id: string;
  fullName: string;
  email: string;
  isAdvisor: boolean;
  created_at: string;
};

type GetUsersResponse = {
  users_list: User[];
  total_count: number;
};

export async function getWorks(
  page: number,
  admin_email: string
): Promise<GetUsersResponse> {
  try {
    const { data } = await api.get(`/users/${page}`);

    const { total_count, users } = data;

    const users_filtered = users.filter((user) => user.email !== admin_email);

    const users_list = users_filtered.map((user) => {
      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isAdvisor: user.isAdvisor,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      };
    });

    return {
      users_list,
      total_count: total_count - 1,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export function useUsers(
  page: number,
  admin_email: string,
  options: UseQueryOptions
) {
  return useQuery(
    ['users', page, admin_email],
    () => getWorks(page, admin_email),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    }
  ) as UseQueryResult<GetUsersResponse, unknown>;
}

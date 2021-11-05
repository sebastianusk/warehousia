import { useQuery } from '@apollo/client';
import { GET_ADMINS } from 'app/graph';
import { AdminModel } from '../../hooks';

interface AdminDetailHeaderState {
  data: AdminModel;
}

export default function useAdminDetailHeaderHooks(
  id: string
): AdminDetailHeaderState {
  const { data } = useQuery(GET_ADMINS, { variables: { query: id } });
  return { data: data?.admins[0] };
}

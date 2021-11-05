import { useQuery } from '@apollo/client';
import { GET_ADMINS } from 'app/graph';
import { Dispatch, SetStateAction, useState } from 'react';
import { AdminModel } from '../../hooks';

interface AdminDetailHeaderState {
  data: AdminModel;
  editUser: boolean;
  setEditUser: Dispatch<SetStateAction<boolean>>;
}

export default function useAdminDetailHeaderHooks(
  id: string
): AdminDetailHeaderState {
  const { data } = useQuery(GET_ADMINS, { variables: { query: id } });
  const [editUser, setEditUser] = useState(false);
  return { data: data?.admins[0], editUser, setEditUser };
}

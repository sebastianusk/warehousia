import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../graph';

export default function checkAuth() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery(IS_LOGGED_IN);
  return !!data.isLoggedIn;
}

export default function checkAuth() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const token = localStorage.getItem('token');
  return token !== null;
}

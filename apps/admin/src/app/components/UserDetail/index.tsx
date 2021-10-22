import React from 'react';
import { useParams } from 'react-router-dom';
import UserDetailHeader from './components/UserDetailHeader';

export default function UserDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  return <UserDetailHeader id={id} />;
}

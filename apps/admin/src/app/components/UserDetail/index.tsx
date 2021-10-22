import React from 'react';
import { useParams } from 'react-router-dom';
import UserDetailHeader from './components/UserDetailHeader';
import UserDetailLog from './components/UserDetailLog';

export default function UserDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <UserDetailHeader id={id} />
      <UserDetailLog id={id} />
    </div>
  );
}

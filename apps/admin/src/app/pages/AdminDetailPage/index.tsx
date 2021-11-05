import React from 'react';
import { useParams } from 'react-router-dom';
import AdminDetailHeader from './components/UserDetailHeader';
import AdminDetailLog from './components/UserDetailLog';

export default function AdminDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <AdminDetailHeader id={id} />
      <AdminDetailLog id={id} />
    </div>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';
import AdminDetailHeader from './components/AdminDetailHeader';
import AdminDetailLog from './components/AdminDetailLog';

export default function AdminDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <AdminDetailHeader id={id} />
      <AdminDetailLog id={id} />
    </div>
  );
}

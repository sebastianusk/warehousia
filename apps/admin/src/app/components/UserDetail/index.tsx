import React from 'react';
import { useParams } from 'react-router-dom';

export default function UserDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  return <div>{id}</div>;
}

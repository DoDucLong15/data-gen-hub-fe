'use client';

import { useParams } from 'next/navigation';

function Dashboard() {
  const { id } = useParams();
  return (
    <div className="container mx-auto px-6 py-8">
      <h1>Dashboard</h1>
      <p>Class ID: {id}</p>
    </div>
  );
}
export default Dashboard;

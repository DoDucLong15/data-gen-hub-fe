import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Management System',
  description: 'Manage student records with CRUD operations, filtering, import and export functionality',
};

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

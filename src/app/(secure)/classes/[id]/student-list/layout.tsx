'use client';

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

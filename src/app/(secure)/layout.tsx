import ClientQueryProvider from '@/context/query.context';

export default function SecureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientQueryProvider>
        {children}
      </ClientQueryProvider>
    </>
  );
}

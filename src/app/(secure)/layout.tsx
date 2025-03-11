import ClientQueryProvider from "@/context/query.context";
import Header from "../_components/Header";

export default function SecureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientQueryProvider>
        <Header />
        {children}
      </ClientQueryProvider>
    </>
  );
}
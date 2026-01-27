export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};

import UserRegisterPage from "@/components/pages/user-register";

interface PageProps {
  params: Promise<{ uuid: string }>;
}

export default async function Page({ params }: PageProps) {
  const uuid = (await params).uuid;

  if (!uuid) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <UserRegisterPage uuid={uuid} />
    </div>
  );
}

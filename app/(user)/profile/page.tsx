// ** Import Components
import FormProfile from "@/components/FormProfile";

// ** Import Other
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col gap-5 justify-center items-center h-[85vh]">
      <h1 className="text-xl font-bold">Your Profile</h1>

      <FormProfile user={user} />
    </main>
  );
}

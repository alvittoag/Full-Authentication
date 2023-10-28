// ** Import Components

import FormSignIn from "@/components/FormSignIn";

export default function SignIn() {
  return (
    <main className="flex flex-col gap-5 justify-center items-center h-[85vh]">
      <h1 className="text-xl font-bold">Please Sign In</h1>

      <FormSignIn />
    </main>
  );
}

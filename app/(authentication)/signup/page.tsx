// ** Import Components
import FormSignUp from "@/components/FormSignUp";

export default function SignUp() {
  return (
    <main className="flex flex-col gap-5 justify-center items-center h-[85vh]">
      <h1 className="text-xl font-bold">Please Sign Up</h1>

      <FormSignUp />
    </main>
  );
}

// ** import Components
import FormResetPassword from "@/components/FormResetPassword";

export default function ForgetPassword() {
  return (
    <main className="flex flex-col gap-5 justify-center items-center h-[85vh]">
      <h1 className="text-xl font-bold">Reset Your Password</h1>

      <FormResetPassword />
    </main>
  );
}

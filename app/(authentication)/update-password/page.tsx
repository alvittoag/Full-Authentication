// ** import Components
import FormUpdatePassword from "@/components/FormUpdatePassword";

export default function UpdatePassword() {
  return (
    <main className="flex flex-col gap-5 justify-center items-center h-[85vh]">
      <h1 className="text-xl font-bold">Update Your Password</h1>

      <FormUpdatePassword />
    </main>
  );
}

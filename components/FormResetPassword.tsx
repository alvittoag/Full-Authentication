"use client";

// ** Import React
import React from "react";

// ** Import UI
import Button from "./ui/Button";
import Input from "./ui/Input";

// ** Import Next
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FormResetPassword() {
  const [input, setInput] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(input, {
      redirectTo: `${location.origin}/update-password`,
    });

    if (!error) {
      alert("Email Has Been Resend To Your Email");

      setLoading(false);
    } else {
      alert(error.message);

      setLoading(false);
    }

    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSignIn} className="flex flex-col gap-8">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />

        <Button type="submit">{loading ? "Loading..." : "Reset"}</Button>
      </form>
    </>
  );
}

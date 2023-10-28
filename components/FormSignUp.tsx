"use client";

// ** Import React
import React from "react";

// ** Import UI
import Button from "./ui/Button";
import Input from "./ui/Input";

// ** Import Next
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FormSignUp() {
  const [input, setInput] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          name: input.name,
        },
      },
    });

    if (!error) {
      alert("Sign Up Success");

      router.push("/signin");

      setLoading(false);
    } else {
      alert(error.message);

      setLoading(false);
    }

    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSignUp} className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Input
            name="name"
            type="text"
            placeholder="Name"
            value={input.name}
            onChange={handleOnChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={handleOnChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleOnChange}
          />
        </div>

        <Button type="submit">{loading ? "Loading..." : "Sign Up"}</Button>
      </form>

      <p>
        Have an account {""}
        <span
          onClick={() => router.push("/signin")}
          className="text-red-600 hover:cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </>
  );
}

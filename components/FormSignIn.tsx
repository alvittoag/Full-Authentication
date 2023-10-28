"use client";

// ** Import React
import React from "react";

// ** Import UI
import Button from "./ui/Button";
import Input from "./ui/Input";

// ** Import Next
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FormSignIn() {
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState({
    email: false,
    github: false,
  });

  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading({ ...loading, email: true });

    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (!error) {
      alert("Signin Success");
      router.push("/profile");

      setLoading({ ...loading, email: false });
    } else {
      alert(error.message);

      setLoading({ ...loading, email: false });
    }

    router.refresh();
  };

  const handleSignInGithub = async () => {
    setLoading({ ...loading, github: true });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (!error) {
      setLoading({ ...loading, github: false });
    } else {
      setLoading({ ...loading, github: false });
    }
  };

  return (
    <>
      <form onSubmit={handleSignIn} className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
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

        <div className="flex flex-col gap-3">
          <Button disable={loading.email} type="submit">
            {loading.email ? "Loading..." : "Sign In"}
          </Button>
        </div>
      </form>

      <Button onClick={handleSignInGithub} outline disable={loading.github}>
        {loading.github ? "Loading.." : "Github"}
      </Button>

      <div>
        <div>
          {"Don't"} have account{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-red-600 hover:cursor-pointer"
          >
            Sign Up
          </span>
        </div>

        <p
          onClick={() => router.push("/forget-password")}
          className="text-red-600 hover:cursor-pointer text-center"
        >
          Forget Password
        </p>
      </div>
    </>
  );
}

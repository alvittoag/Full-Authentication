"use client";

// ** Import React
import React from "react";

// ** Import UI
import Button from "./ui/Button";

// ** Import Other
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function Navbar({ user }: { user: User }) {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (!error) {
      alert("Logout Successs");

      router.push("/signin");

      setLoading(false);
    } else {
      alert(error.message);
      setLoading(false);
    }

    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-xl font-bold">Supabase</h1>

      {user ? (
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <h1>Hi, {user.user_metadata.name}</h1>

            <Image
              src={user.user_metadata.picture}
              quality={100}
              width={50}
              height={60}
              style={{
                objectFit: "cover",
                width: 40,
                height: 40,
              }}
              className="rounded-full border border-gray-800"
              alt="Profile"
            />
          </div>

          <Button disable={loading} onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/signin")}>Sign In</Button>
      )}
    </nav>
  );
}

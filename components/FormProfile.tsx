"use client";

// ** Import React
import React from "react";

// ** Import Ui
import Input from "./ui/Input";
import Button from "./ui/Button";

// ** Import Other
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function FormProfile({ user }: { user: User }) {
  const [input, setInput] = React.useState({
    name: user.user_metadata.name as string,
    email: user.email as string,
    id: user.user_metadata.id as string,
    password: "",
    alamat: user.user_metadata.alamat as string,
  });
  const [image, setImage] = React.useState<any>(null);
  const [isChange, setIsChange] = React.useState(false);

  const oldData = {
    name: user.user_metadata.name,
    email: user.email,
    id: user.user_metadata.id,
    password: "",
    alamat: user.user_metadata.alamat,
  };

  const [loading, setLoading] = React.useState(false);

  const validation = JSON.stringify(input) === JSON.stringify(oldData);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files) {
      setImage(files[0] as any);
    }

    setInput({ ...input, [name]: value });
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (image) {
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(image.name, image, {
          upsert: true,
          contentType: "image/png",
        });

      if (!error) {
        const getImages = supabase.storage
          .from("photos")
          .getPublicUrl(data.path);

        const { error } = await supabase.auth.updateUser({
          data: {
            picture: getImages.data.publicUrl,
          },
        });

        if (!error) {
          alert("Upload Picture Success");

          setImage(null);

          setLoading(false);
        } else {
          alert(error.message);

          setLoading(false);
        }
      } else {
        alert(error.message);
        setLoading(false);
      }
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        name: input.name,
        alamat: input.alamat,
        id: input.id,
      },
    });

    if (!error) {
      alert("Update Profile Success");

      setLoading(false);
    } else {
      alert(error.message);

      setLoading(false);
    }

    router.refresh();
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: input.password,
    });

    if (!error) {
      alert("Update Password Success");

      setLoading(false);
    } else {
      alert(error.message);

      setLoading(false);
    }

    router.refresh();
  };

  return (
    <>
      {!isChange ? (
        // Form Update Profile
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <Input
              disable
              name="email"
              type="email"
              placeholder="Email"
              value={input.email}
              onChange={handleOnChange}
            />

            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={input.name}
              onChange={handleOnChange}
            />

            <Input
              name="id"
              type="text"
              placeholder="No ID"
              value={input.id}
              onChange={handleOnChange}
            />

            <Input
              name="alamat"
              type="text"
              placeholder="Alamat"
              value={input.alamat}
              onChange={handleOnChange}
            />

            <Input name="images" type="file" onChange={handleOnChange} />
          </div>

          <Button type="submit" disable={loading || validation}>
            {loading ? "Loading..." : "Update Profile"}
          </Button>
        </form>
      ) : (
        // Form Update Password

        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
          <Input
            name="password"
            type="password"
            placeholder="New Password"
            value={input.password}
            onChange={handleOnChange}
          />

          <Button type="submit" disable={loading || validation}>
            {loading ? "Loading..." : "Change Password"}
          </Button>
        </form>
      )}

      <Button outline onClick={() => setIsChange(!isChange)}>
        {isChange ? "Back" : "Change Password"}
      </Button>
    </>
  );
}

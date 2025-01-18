import { Links } from "@/app/user/[username]/page";
import { getStorageUrl, supabase } from "@/lib/supabase";
import { createUser } from "@/lib/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const avatarFile = formData.get("avatar");
    let avatar: string | null = null;

    if (avatarFile && avatarFile instanceof File) {
      const fileName = `avatarFile_${username}.${avatarFile.name
        .split(".")
        .pop()}`;
      const { error } = await supabase.storage
        .from("id_images")
        .upload(fileName, avatarFile, {
          upsert: true,
        });
      if (error) {
        console.error("Failed to upload avatarFile:", error);
        return NextResponse.json(
          { message: "Failed to upload avatarFile" },
          { status: 500 }
        );
      }
      avatar = getStorageUrl(fileName);
    }

    const address = formData.get("address") as string;
    const nfc = formData.get("nfc") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const links = formData.get("links");

    if (!username || !address || !nfc || !email || !bio || !avatar) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = {
      username: username as string,
      address: address as string,
      nfc: nfc as string,
      email: email as string,
      bio: bio as string,
      avatar: avatar,
      links: links ? (JSON.parse(links.toString()) as Links) : {},
    };

    const { data, error } = await createUser(user);

    if (error) {
      console.error("Failed to update route:", error);
      return NextResponse.json({ message: error }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("Error parsing request body:", err);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}

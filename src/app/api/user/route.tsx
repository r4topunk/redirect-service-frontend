import { UserFormData } from "@/components/user-form";
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

    const address = formData.get("address");
    const nfc = formData.get("nfc");
    const email = formData.get("email");
    const bio = formData.get("bio");
    const x = formData.get("x");
    const instagram = formData.get("instagram");
    const tiktok = formData.get("tiktok");
    const shop = formData.get("shop");
    const contact_email = formData.get("contact_email");
    // const links = formData.get("links");

    if (!username || !address || !nfc || !email || !bio || !avatar) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user: UserFormData = {
      username: username.toString(),
      address: address.toString(),
      nfc: nfc.toString(),
      email: email.toString(),
      bio: bio.toString(),
      avatar: avatar.toString(),
    };

    if (x) user.x = x.toString();
    if (instagram) user.instagram = instagram.toString();
    if (tiktok) user.tiktok = tiktok.toString();
    if (shop) user.shop = shop.toString();
    if (contact_email) user.contact_email = contact_email.toString();

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

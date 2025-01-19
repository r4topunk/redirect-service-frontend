"use client";

import { User } from "@/app/user/[username]/page";
import { Mail, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import ClaimNft from "../claim-nft";
import { Button } from "../ui/button";

export default function UserPage({ user }: { user: User }) {
  const [claimed, setClaimed] = useState(false);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div>
        <img
          src={user.avatar}
          alt={user.username}
          className="rounded-full w-24 h-24 mx-auto mb-3"
        />
        <p className="text-center text-xl font-bold">@{user.username}</p>
        <p className="text-center text-sm text-muted-foreground">{user.bio}</p>
      </div>
      <div className="flex justify-center gap-2">
        {user.x && (
          <Button asChild variant="outline">
            <Link href={user.x} target="_blank">
              <FaXTwitter />
            </Link>
          </Button>
        )}
        {user.instagram && (
          <Button asChild variant="outline">
            <Link href={user.instagram} target="_blank">
              <FaInstagram />
            </Link>
          </Button>
        )}
        {user.tiktok && (
          <Button asChild variant="outline">
            <Link href={user.tiktok} target="_blank">
              <FaTiktok />
            </Link>
          </Button>
        )}
      </div>
      <div className="flex justify-center gap-2">
        {user.shop && (
          <Button className="w-full" asChild variant="outline">
            <Link href={user.shop} target="_blank">
              <Store />
              Shop
            </Link>
          </Button>
        )}
        {user.email && (
          <Button className="w-full" asChild variant="outline">
            <Link href={`mailto:${user.email}`} target="_blank">
              <Mail />
              Email
            </Link>
          </Button>
        )}
      </div>
      <ClaimNft user={user} claimed={claimed} setClaimed={setClaimed} />
      <div className="flex flex-col gap-3">
        {user.links.map((link, index) => {
          return (
            <Button asChild variant={"secondary"} key={index}>
              <Link href={link.url} target="_blank">
                {link.description}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { User } from "@/app/user/[username]/page";
import { Handshake, Mail, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import PietLogo from "../icons/piet";
import { Button } from "../ui/button";
import UserForm from "../user-form";

export default function UserPage({ user }: { user: User }) {
  const [claimed, setClaimed] = useState(false);

  if (!user.address) {
    return <UserForm user={user} />;
  }

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
        {user.links.x && (
          <Button asChild variant="outline">
            <Link href={user.links.x} target="_blank">
              <FaXTwitter />
            </Link>
          </Button>
        )}
        {user.links.instagram && (
          <Button asChild variant="outline">
            <Link href={user.links.instagram} target="_blank">
              <FaInstagram />
            </Link>
          </Button>
        )}
        {user.links.tiktok && (
          <Button asChild variant="outline">
            <Link href={user.links.tiktok} target="_blank">
              <FaTiktok />
            </Link>
          </Button>
        )}
      </div>
      <div className="flex justify-center gap-2">
        {user.links.shop && (
          <Button className="w-full" asChild variant="outline">
            <Link href={user.links.shop} target="_blank">
              <Store />
              Shop
            </Link>
          </Button>
        )}
        {user.links.email && (
          <Button className="w-full" asChild variant="outline">
            <Link href={`mailto:${user.email}`} target="_blank">
              <Mail />
              Email
            </Link>
          </Button>
        )}
      </div>
      {!claimed ? (
        <Button
          onClick={() => setClaimed(true)}
          className=" w-full bg-orange-100 text-orange-500 border border-orange-500 px-4 py-2 rounded-md mx-auto font-semibold flex items-center justify-center gap-1 leading-none hover:bg-orange-100 hover:scale-[1.015] transition-transform"
        >
          {/* <Sparkles className="inline-block w-4 h-4" /> */}
          <PietLogo className="inline-block w-4 h-4" />
          Claim NFT
        </Button>
      ) : (
        <Button
          onClick={() => setClaimed(true)}
          className="w-full bg-orange-100 text-orange-500 hover:bg-orange-100 border-none px-4 py-2 rounded-md mx-auto font-medium flex items-center justify-center gap-1 leading-none"
        >
          <Handshake strokeWidth={1.5} />
          You met @{user.username}
        </Button>
      )}
      <div className="flex flex-col gap-3">
        {user.links.items.map((link, index) => {
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

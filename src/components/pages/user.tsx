"use client";

import { User } from "@/app/user/[username]/page";
import { Edit, LinkIcon, Mail, Pencil, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { useActiveAccount } from "thirdweb/react";
import ClaimNft from "../claim-nft";
import { Button } from "../ui/button";

export default function UserPage({
  user,
  showClaimButton,
}: {
  user: User;
  showClaimButton: boolean;
}) {
  const [claimed, setClaimed] = useState(false);
  const [showClaim, setShowClaim] = useState(showClaimButton);

  const account = useActiveAccount();
  const userOwnAccount = account?.address === user.address;

  // if (!account?.address) {
  //   return (
  //     <div className="flex justify-center items-center w-full h-[100dvh]">
  //       <ConnectButton />
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <div>
        <img
          src={user.avatar}
          alt={user.username}
          className="rounded-full w-24 h-24 mx-auto mb-3 object-cover"
        />
        {userOwnAccount ? (
          <Link
            href={`/user/edit/${user.username}`}
            prefetch={false}
            className="flex gap-1 justify-center items-center"
          >
            <p className="text-center text-xl font-bold">@{user.username}</p>
            <Pencil size={14} strokeWidth={2.4} />
          </Link>
        ) : (
          <p className="text-center text-xl font-bold">@{user.username}</p>
        )}
        <p className="text-center text-sm text-muted-foreground">{user.bio}</p>
      </div>
      <div className="flex justify-center gap-2">
        {user.x && (
          <Button size={"lg"} asChild variant="outline">
            <Link href={`https://x.com/${user.x}`} target="_blank">
              <FaXTwitter />
            </Link>
          </Button>
        )}
        {user.instagram && (
          <Button size={"lg"} asChild variant="outline">
            <Link
              href={`https://instagram.com/${user.instagram}`}
              target="_blank"
            >
              <FaInstagram />
            </Link>
          </Button>
        )}
        {user.tiktok && (
          <Button size={"lg"} asChild variant="outline">
            <Link
              href={`https://www.tiktok.com/@${user.tiktok}`}
              target="_blank"
            >
              <FaTiktok />
            </Link>
          </Button>
        )}
      </div>
      <div className="flex justify-center gap-2">
        {user.shop && (
          <Button className="w-full" asChild variant="outline" size={"lg"}>
            <Link href={user.shop} target="_blank">
              <Store />
              Shop
            </Link>
          </Button>
        )}
        {user.email && (
          <Button className="w-full" asChild variant="outline" size={"lg"}>
            <Link href={`mailto:${user.email}`} target="_blank">
              <Mail />
              Email
            </Link>
          </Button>
        )}
      </div>
      <ClaimNft
        user={user}
        claimed={claimed}
        setClaimed={setClaimed}
        showClaim={showClaim}
        setShowClaim={setShowClaim}
      />
      <div className="flex flex-col gap-3">
        {user.links.map((link, index) => {
          if (link.secret && user.address !== account?.address && !claimed)
            return null;

          return (
            <Button
              asChild
              variant={"outline"}
              key={index}
              size={"lg"}
              // className="border border-gray-200 dark:border-gray-700"
            >
              <Link href={link.link} target="_blank">
                <LinkIcon />
                {link.description}
              </Link>
            </Button>
          );
        })}
        {user.address === account?.address && (
          <Button asChild variant={"ghost"} size={"lg"}>
            <Link href="/user/links">
              <Edit /> Add links
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

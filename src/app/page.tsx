"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Button
        className="font-geist-mono"
        onClick={() => alert("Hack the planet")}
      >
        Hello world
      </Button>
    </div>
  );
}

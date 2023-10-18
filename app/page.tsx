'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { MessageSquare, Search } from "lucide-react";
import { IconUser } from "@/components/ui/icons";

import { Input } from "@/components/ui/input";


export default function Home() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  return <div className="flex flex-col max-w-xl mx-auto  justify-center items-center p-12 gap-8 text-center">

    <Card className="flex flex-col w-full justify-center items-center py-12 px-8 gap-6 bg-primary border border-4">
      <Search className="w-12 h-12" />
      <form onSubmit={(e) => {
        e.preventDefault()
        router.push(`/${search}`)
      }
      }>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="markeljan" />
      </form>
      <p className="text-xl text-center">Enter a username to chat with an Orbis AI Avatar</p>
    </Card>

    <Link href="/chat">
      <Card className="flex flex-col w-full justify-center items-center py-12 px-8 gap-6 bg-primary border border-4">
        <MessageSquare className="w-12 h-12" />
        <p className="text-xl">Join the chatroom to meet new Orbis frens!</p>
      </Card>
    </Link>


    <Link href="/profile">
      <Card className="flex flex-col w-full justify-center items-center py-12 px-8 gap-6 bg-primary border border-4">
        <IconUser className="w-12 h-12" />
        <p className="text-xl">Update your profile to fine-tune your AI with personal data and your voice using Elevenlabs.</p>
      </Card>
    </Link>
  </div>


}

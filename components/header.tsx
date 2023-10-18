'use client'
import Link from 'next/link'

import { IconHome, IconNextChat, IconUser } from './ui/icons'
import { Button } from './ui/button'
import { MessageSquare } from 'lucide-react'

export async function Header() {

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-2 bg-secondary rounded">
                <Link href="/">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <IconHome className="w-5 h-5" />
                        Home
                    </Button>
                </Link>
                <div className="w-px h-5 bg-background font-bold"></div>
                <Link href="/chat">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Chat
                    </Button>
                </Link>
            </div>
            <div className="absolute flex items-center left-0 lg:left-1/2 lg:-translate-x-1/2 gap-2 px-4 pointer-events-none">
                <p className='hidden lg:flex text-lg'>Orbis Chat</p>
            </div>

            <Link href="/profile">
                <Button variant="secondary" className="flex items-center gap-2">
                    <IconUser className="w-5 h-5" />
                </Button>
            </Link>

        </header>
    )
}
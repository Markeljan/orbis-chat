'use client'

import { useChat, type Message } from 'ai/react'
import { toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useTextToSpeech } from '@/lib/hooks/use-text-to-speech'
import { useOrbis } from '@/lib/hooks/use-orbis'
export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
}

export function Chat({ className, username }: ChatProps & { username: string }) {
    const { fetchedProfileData } = useOrbis(username)
    const voiceId = fetchedProfileData?.data[0]?.details?.profile?.data?.trainingData?.voiceId
    const data = fetchedProfileData?.data[0]?.details?.profile?.data?.trainingData?.data

    console.log('fetchedProfileData', fetchedProfileData)
    console.log('voiceId', voiceId)
    console.log('data', data)
    const toggleAudio = useTextToSpeech()

    const { messages, append, reload, stop, isLoading, input, setInput } =
        useChat({
            initialMessages: [
                {
                    id: '1',
                    content: data,
                    role: 'system'
                }
            ],
            onResponse(response) {
                if (response.status === 401) {
                    toast.error(response.statusText)
                }
            },
            onFinish(message) {
                toggleAudio(message.content, voiceId)
            }
        })

    return (
        <>
            <div className={cn('pb-[200px] md:pt-10', className)}>
                {messages.length ? (
                    <>
                        <ChatList messages={messages} voiceId={voiceId} />
                        <ChatScrollAnchor trackVisibility={isLoading} />
                    </>
                ) : null
                }
            </div>
            <ChatPanel
                isLoading={isLoading}
                stop={stop}
                append={append}
                reload={reload}
                messages={messages}
                input={input}
                setInput={setInput}
            />
        </>
    )
}
import { Chat } from '@/components/chat'

export default function Home({ params }: { params: { username: string } }) {
  return <div className="max-w">
    <Chat username={params.username} />
  </div>
}

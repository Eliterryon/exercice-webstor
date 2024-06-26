import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
    const { data: session } = useSession()
    return (
        <Layout>
            <div>
                coucou {session?.user.name}
            </div>
            <div>
                
            </div>
        </Layout>
    )
}

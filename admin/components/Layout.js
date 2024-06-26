
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";

export default function Layout({children}) {
    const { data: session } = useSession()
    if(!session) {
        return (
            <div className="bg-red-500 h-screen w-screen flex items-center ">
                <div className="text-center w-full" >
                    <button className="bg-white p-2 rounded-full"  onClick={() => signIn("google")}>login with google</button> 
                </div>
            </div>
        );
    }
    return (
        <div className="bg-slate-800 h-screen w-screen min-h-screen flex font-sans">
            <Nav/>
            <div className="bg-slate-300 flex-grow p-4 rounded-l-lg m-2 ml-0 overflow-auto">
                {children}
            </div>
        </div>
    )
}

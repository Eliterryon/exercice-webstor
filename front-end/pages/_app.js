import Headers from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className='bg-orange-300 h-screen w-screen min-h-screen flex font-sans'>
        <Headers />
        <div className="mt-20 flex-grow overflow-auto">
        	<Component {...pageProps}/>
        </div>
    </div>
  )
}

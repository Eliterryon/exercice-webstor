"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Headers(){

    const pathname = usePathname()

    const navigation = [
        { name: 'Home', href: '/', current: pathname==='/' },
        { name: 'All Product', href: 'product', current: pathname==='/product' },
        { name: 'Categorie', href: 'categorie', current: pathname==='/categorie' },
        { name: 'Account', href: 'account', current: pathname==='/account' },
        { name: 'Cart', href: 'cart', current: pathname==='/cart' },
    ]  

    console.log('pathname',pathname, pathname==='/')
    return(
        <nav className="bg-gray-900 fixed w-full h-20 ">
            <div className="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4 my-1">
                <a href="/" className="flex items-center space-x-3 ">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MitFox Webstore</span>
                </a>
                <div className="flex flex-row space-x-10">
                    {navigation.map((item) => (
                        <Link  
                            key={item.name}
                            href={item.href}
                            className={classNames(
                            item.current ? 'bg-slate-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
        
}
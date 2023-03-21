import Image from 'next/image'
import React from 'react'
import {
    MagnifyingGlassIcon,
    PlusCircleIcon,
    UserGroupIcon, HeartIcon,
    PaperAirplaneIcon,
    Bars3Icon
} from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);

    console.log(session)
    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>

            <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
                {/* left */}
                <div onClick={() => router.push('/')}
                    className='relative w-34 hidden lg:inline-grid cursor-pointer mt-4'>
                    <Image src="https://links.papareact.com/ocw" alt="" height={64} width={128} className=" object-contain object-fill" />
                </div>
                <div onClick={() => router.push('/')}
                    className='relative w-10  lg:hidden flex-shrink-0 cursor-pointer mt-4 '>
                    <Image src="https://links.papareact.com/jjm" alt="" height={40} width={40} className=" object-contain object-fill" />
                </div>

                {/* middle */}
                <div className='max-w-xs'>
                    <div className='relative rounded-md mt-1 p-3'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <MagnifyingGlassIcon className='w-5 h-5 text-gray-500' />
                        </div>
                        <input type="text" placeholder="Search" className='bg-gray-50 block w-full pl-10
                    sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md'/>
                    </div>
                </div>

                {/* right */}
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={() => router.push('/')} className='navBtn' />
                    <Bars3Icon className='h-6 md:hidden cursor-pointer' />
                    {session ? (
                        <>
                            <div className='relative navBtn'>
                                <PaperAirplaneIcon className='navBtn -rotate-45 ' />
                                <div className='absolute -top-1 
                        -right-2 text-xs w-4 h-4 bg-red-500 rounded-full flex
                         items-center justify-center animate pulse text-white'>
                                    3
                                </div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                            <UserGroupIcon className='navBtn' />
                            <HeartIcon className='navBtn' />
                            <img onClick={signOut}
                                src={session?.user?.image} alt='Profile Picture'
                                className='h-10 rounded-full cursor-pointer' />

                        </>
                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Header

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

function MiniProfile() {
    const { data: session } = useSession();
    console.log(session)
    return (
        <div className='flex items-center mt-14 ml-10 justify-between '>
            <img src={session?.user?.image} alt=''
                className='rounded-full h-16 w-16 border p-[2px]' />
            <div className='flex-1 mx-4'>
                <h2 className='font-bold'>{session?.user?.username}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>
            <button onClick={signOut} className='text-blue-400 font-semibold text-sm'>Sign Out</button>
        </div>
    )
}

export default MiniProfile

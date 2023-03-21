import React from 'react'
import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import Header from '@/components/Header'
// Browser....
export default function signIn({ providers }) {
    return (
        <>
            <Header />
            <div className='flex flex-col min-h-screen py-2 items-center justify-center'>
                <img src='https://links.papareact.com/ocw' alt='' className='w-80' />
                <p className='font-xs italic'>This is a not the original instagram App.Just a Clone of Instagram</p>
                <div className='mt-40'>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className='p-3 bg-blue-500 rounded-md text-white' onClick={() =>
                                SignIntoProvider(provider.id, { callbackUrl: '/' })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
// Server side rendering
export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers,
        },
    }
}



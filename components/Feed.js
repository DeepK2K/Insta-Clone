import { useSession } from 'next-auth/react'
import React from 'react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

function Feed() {
    const { data: session } = useSession();
    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl 
        xl:max-w-6xl xl:grid-cols-3 mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/* Section */}
            <section className='col-span-2'>
                {/* Stories */}
                <Stories />
                {/* Post  */}
                <Posts />
            </section>

            {/* Section */}
            {session && (
                <section className=' hidden xl:inline-grid md:col-span-1'>
                    <div className='fixed top-20'>
                        {/* mini profile */}
                        <MiniProfile />
                        {/* Suggestions      */}
                        <Suggestions />

                    </div>

                </section>
            )}

        </main>
    )
}

export default Feed

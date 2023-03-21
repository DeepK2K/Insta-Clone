import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import createRandomUser from './fakerSuggestions';
import Story from './Story';
import { useSession } from 'next-auth/react';



function Stories() {
    const [suggestions, setSuggestions] = useState([])
    const { data: session } = useSession();
    useEffect(() => {
        const suggestions = [...Array(20)].map(() => createRandomUser());
        setSuggestions(suggestions);


        console.log(suggestions)
    }, [])
    return (
        <div className='flex space-x-2 bg-white mt-8 border border-gray-200 overflow-x-scroll 
        rounded-sm scrollbar-thin scrollbar-thumb-black'>
            {session && (
                <Story img={session.user.image}
                    username={session.user.username} />
            )}
            {
                suggestions.map(profile => (
                    <Story key={profile.id}
                        img={profile.avatar}
                        username={profile.username} />
                ))
            }
            {/* Story */}
            {/* Story */}
            {/* Story */}

        </div>
    )
}

export default Stories

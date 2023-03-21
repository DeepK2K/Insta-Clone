import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react'

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
            id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
            company: faker.company.name(),
        }));
        setSuggestions(suggestions);
        console.log(suggestions)
    }, [])
    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm text-gray-400 font-bold'>Suggestions for You</h3>
                <button className='text-gray-600 font-semi-bold'>See All</button>
            </div>
            {
                suggestions.map((profile) => (
                    <div key={profile.id} className='flex itmes-center justify-between mt-3'>
                        <img src={profile.avatar} alt=""
                            className='w-10 h-10 rounded-full border p-[2px]' />
                        <div className='flex-1 ml-4'>
                            <h2>{profile.username}</h2>
                            <h3 className='text-xs tet-gray-400'>Works at {profile.company}</h3>
                        </div>
                        <button className='text-blue-400 text-xs font-bold'>Follow</button>
                    </div>


                ))}

        </div>
    )
}

export default Suggestions

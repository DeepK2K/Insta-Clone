import React from 'react'

function Story({ img, username }) {
    return (
        <div className=''>
            <img src={img} alt="Suggestion" className='h-14 w-14 rounded-full p-[1.5px]
            border-red-500 cursor-pointer border-2 object-contain
            hover:scale-110 transition transform duration-200 ease-out mt-2' />
            <p className='text-xs text-center w-14 truncate'>{username}</p>

        </div>
    )
}

export default Story

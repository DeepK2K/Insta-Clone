import { db } from '@/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Post from './Post'



function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() =>
        onSnapshot(
            query(collection(db, 'posts'), orderBy("timestamp", "desc")),
            (snapshot) => {
                setPosts(snapshot.docs)
            }), [db]);
    console.log(posts)
    return (
        <div>
            {/* Post */}
            {posts.map((post) => (
                <Post key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userImg={post.data().profileImg}
                    img={post.data().image}
                    caption={post.data().caption} />
            ))}
            {/* Post */}
            {/* Post */}
            {/* Post */}
        </div>
    )
}

export default Posts

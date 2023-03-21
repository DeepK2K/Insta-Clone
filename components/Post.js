import React, { useEffect, useState } from 'react'
import {
    EllipsisHorizontalIcon,
    BookmarkIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    FaceSmileIcon,
    PaperAirplaneIcon,
    HeartIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Moment from 'react-moment';

function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession();
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() =>
        onSnapshot(
            query(collection(db, "posts", id, "comments"),
                orderBy('timestamp', 'desc')
            ),
            (snapshot) => setComments(snapshot.docs)
        )
        , [db, id]
    )

    useEffect(() =>
        onSnapshot(
            collection(db, 'posts', id, 'likes'),
            (snapshot) => setLikes(snapshot.docs),
        ), [db, id]
    )
    useEffect(() =>
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        ), [likes]
    )

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }

    };
    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
        })
    }

    return (
        <div className='bg-white my-7 rounded-sm border'>
            {/* Header */}
            <div className='flex items-center p-5'>
                <img src={userImg} alt='' className='h-12 w-12 object-contain rounded-full border p-1 mr-3' />
                <p className='flex-1 font-bold'>{username}</p>
                <EllipsisHorizontalIcon className='h-5' />
            </div>

            {/* Image  */}
            <img src={img} alt="" className='w-full object-cover' />

            {/* Buttons */}
            {session && (
                <div className='flex justify-between'>
                    <div className='flex space-x-4'>
                        {hasLiked ? (
                            <HeartIconFilled onClick={likePost} className='btn text-red-500' />
                        ) : (
                            <HeartIcon onClick={likePost} className='btn' />
                        )}

                        <ChatBubbleOvalLeftEllipsisIcon className='btn' />
                        <PaperAirplaneIcon className='btn -rotate-45' />
                    </div>
                    <BookmarkIcon className='btn ' />
                </div>
            )}

            {/* Caption  */}
            <p className='p-5 truncate'>
                {likes.length > 0 && (
                    <p className='font-bold mb-1'>{likes.length} likes</p>
                )}
                <span className='font-bold mr-1'>{username}</span>
                {caption}
            </p>
            {/* Comments  */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map((comment) => (
                        <div className='flex items-center space-x-2 mb-3' key={comment.id}>
                            <img className='h-7 rounded-full'
                                src={comment.data().userImg} alt='' />
                            <p className='text-sm flex-1'>
                                <span className='font-bold'>{comment.data().username}</span>
                                {" "}{comment.data().comment}
                            </p>
                            <Moment fromNow className='pr-5 text-xs'>{comment.data().timestamp?.toDate()}</Moment>
                        </div>
                    ))}
                </div>
            )}
            {session && (
                <form className='flex items-center p-4'>
                    <FaceSmileIcon className='btn' />
                    <input type='text' className='border-none flex-1 focus:ring-0 outline-none'
                        placeholder='Add a comment...'
                        value={comment}
                        onChange={e => setComment(e.target.value)} />
                    <button type="submit"
                        disabled={!comment.trim()}
                        onClick={sendComment}
                        className='font-semibold text-blue-400 hover:text-blue-500 btn'>Post</button>

                </form>
            )}



        </div>
    )
}

export default Post

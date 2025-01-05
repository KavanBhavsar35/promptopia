"use client";

import { useState, useEffect } from 'react'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation' 

import Profile from '@components/Profile';

const MyProfile = () => {

  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);  
  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  }
  const handleDelete = async (post) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      
      if (session?.user.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
          
        } catch (error) {
          console.error(error);
        }
      }
    };
    
    fetchPosts();
  }, [session]);  // Add session to the dependency array
  

  return (
    <Profile 
      name="My Profile"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      image={session?.user.image}
      />
  )
}
export default MyProfile
"use client";

import { useEffect, useState } from 'react'
import { useParams } from '@node_modules/next/navigation'

import Profile from '@components/Profile';

const OtherUserProfile = () => {
  
  const { userId } = useParams();
  const [user, setUser] = useState({
    name:'',
    email:'',
    image:'',
    data:[]
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await fetch(`/api/users/${userId}`)
      const response = await data.json();

      let temp = {
        username: response.username,
        email: response.email,
        image: response.image,
        data: response.prompts
      }

      console.log(temp)
      setUser(temp)
    }

    fetchProfile();

  }, [])
  return (
    
    <Profile 
      name={user.username}
      desc={`${user.username}'s Profile`}
      data={user.data}
      // data={[]}
      handleEdit={() => {}}
      handleDelete={() => {}}
      image={user.image}
    />
  )
}

export default OtherUserProfile
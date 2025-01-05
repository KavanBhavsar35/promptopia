'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PromptCardList = ({ data, handleTagClick }) => {

  const handleProfileClick = (userId) => {
    console.log("Profile click:", userId);
    
    router.push(`/profile/${userId}`);
  }

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);    

    // Filter posts based on prompt, username, or tags
    const results = posts.filter((post) => {
      const promptMatches = post.prompt.toLowerCase().includes(searchValue);
      const usernameMatches = post.creator.username.toLowerCase().includes(searchValue);
      // const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchValue)); // TODO:convert tag stroing to tag array
      const emailMatches = post.creator.email.toLowerCase().includes(searchValue); 
      const tagsMatches = post.tag.toLowerCase().includes(searchValue);
      return promptMatches || usernameMatches || tagsMatches || emailMatches ;
    });    
    setFilteredPosts(results);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);

    // Filter posts based on the clicked tag
    // const results = posts.filter((post) =>
    //   post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    // );
    const results = posts.filter((post) => post.tag.toLowerCase().includes(tag));

    setFilteredPosts(results);
  }

  const handleProfieClick = (userId) => {
    router.push('/profile/' + userId);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data); // Initialize with all posts
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for prompt, tag, or username"
            className="w-full px-4 py-2 pr-10 rounded-lg focus:outline-none"
            onChange={handleSearchChange}
            required
            value={searchText}
          />
          <button
            type="button"
            onClick={() => setSearchText('')}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="red"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </form>
  
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
  
}

export default Feed;

'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const [copied, setCopied] = useState('');

  const handleCopyFunction = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleProfileClick = () => {
    if (post.creator._id.toString() === session?.user.id.toString()) {
      router.push('/profile');
    } else {
      router.push(`/profile/${post.creator._id}`);
    }
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        {/* Render user details conditionally */}
        {pathName !== '/profile' && !pathName.startsWith('/profile/') && (
          <div className='flex-1 flex justify-end items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
            <div className='flex flex-col items-end'> {/* Align items to the end */}
              <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
              <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
            </div>
            <Image src={post.creator.image} width={40} height={40} alt='user_image' className='rounded-full object-contain' />
          </div>
        )}

        <div className='copy_btn' onClick={handleCopyFunction}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt='copy_btn'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' 
        onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={() => handleDelete(post._id)}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;

"use client"; // Ensure this component is client-side

import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation"; // Adjusted import
import { useSession } from "next-auth/react";
import Image from "next/image"; // Import Image component

const Profile = ({
  name, desc, data, handleEdit, handleDelete, image // Accept image prop
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Only redirect after the component mounts and session status is checked
  if (status === "unauthenticated") {
    router.push('/'); // Redirect to home if no session
    return null; // Avoid rendering until redirect is complete
  }

  return (
    <section className="w-full flex flex-col items-start">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="head_text text-left">
            <span className="blue_gradient">{name}</span>
          </h1>
          <p className="desc text-left">
            {desc}
          </p>
        </div>
        {/* User Profile Picture */}
        <Image 
          src={image} // Use the image prop
          alt={`${name}'s profile picture`} // Alt text for accessibility
          width={100} // Set width for the image
          height={100} // Set height for the image
          className="rounded-full ml-4" // Add margin and make it round
        />
      </div>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;

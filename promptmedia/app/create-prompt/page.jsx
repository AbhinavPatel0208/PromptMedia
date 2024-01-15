
"use client";

import React from 'react'
import { useSession } from 'next-auth/react';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {

    const [submitting, setSubmitting] = useState(false);
    const [post,setPost]=useState({
        prompt:'',
        tag:'',
    });

  return (
    <Form 
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt

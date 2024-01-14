'use client'

import dynamic from 'next/dynamic';
import React from 'react';

// Use dynamic import with ssr set to false
const SignInWithNoSSR = dynamic(() => import('../../components/SignIn'), {
  ssr: false
});

export default function SignIn() {

  return (
    <>
      <SignInWithNoSSR />  {/* This will only be rendered client-side */}
    </>
  )
}

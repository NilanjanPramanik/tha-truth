'use client'

import { z } from 'zod';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toast';
import { getSession, useSession } from "next-auth/react"

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/schemas/userSchema';
import MoonLoader from 'react-spinners/MoonLoader';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VerificationCard from '@/components/VerificationCard';

const SignupPage = () => {
  const router = useRouter();

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [logginUserEmail, setLogginUserEmail] = useState('');

  const form = useForm<z.infer<typeof User>>({
    resolver: zodResolver(User),
    defaultValues: {
      username: "",
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof User>) => {
    setIsLoading(true)
    setVerificationModalOpen(false)

    axios.post('/api/signup', values)
      .then((res) => {
        toast.success(res.data)
        setLogginUserEmail(values.email)
        setVerificationModalOpen(true);
        //router.push('/login')
      })
      .catch((err) => {
        toast.error("Failed to create user")
      })
      .finally(() => setIsLoading(false))
  }

  const handleVerificationCode = () => {
    setIsLoading(true)

    axios.post('/api/verify', { email: logginUserEmail, code: otp })
      .then((res) => {
        toast.success(res.data);
        router.push('/login')
        setLogginUserEmail('');
      })
      .catch((err) => {
        toast.error(err.error)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    const session = getSession();
    session.then((res) => {
      if (res?.user.email) {
        router.push('/');
      }
    })

  }, [router])


  return (
    <div className=' w-screen h-screen flex items-center justify-center p-8'>
      {isVerificationModalOpen ? (
        <div className="flex flex-col space-y-6 w-[220px]">
          {/* <Input placeholder="Verification Code" maxLength={6}/> */}
          <VerificationCard value={otp} setValue={setOtp} />
          <Button
            name='Verify'
            onClick={handleVerificationCode}
            disabled={isLoading}
            className='border border-zinc-700 bg-zinc-600 rounded-md outline-none'>
            {isLoading ? (
              <MoonLoader
                color='#ffffff'
                size={20}
                speedMultiplier={1.5}
              />
            ) : 'Verify'}
          </Button>
        </div>

      ) : (
        <div className='flex flex-col justify-center items-center gap-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-2 w-full sm:w-[400px]"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example_12" {...field}
                        className='
                    placeholder:text-zinc-600 
                    text-zinc-300 
                    outline-none
                    border border-zinc-700
                    '
                      />
                    </FormControl>
                    <FormMessage className='text-rose-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example12@email.com" {...field}
                        className='
                    placeholder:text-zinc-600 
                    text-zinc-300 
                    outline-none
                    border border-zinc-700
                    '
                      />
                    </FormControl>
                    <FormMessage className='text-rose-700' />
                  </FormItem>

                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder="password" {...field}
                        className='
                    placeholder:text-zinc-600 
                    text-zinc-300 
                    outline-none
                    border border-zinc-700
                    '
                      />
                    </FormControl>
                    <FormMessage className='text-rose-700' />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className='border border-zinc-700 bg-zinc-600 rounded-md outline-none'
                disabled={isLoading}
              >
                {isLoading ? (
                  <MoonLoader
                    color='#ffffff'
                    size={20}
                    speedMultiplier={1.5}
                  />
                ) : 'Sign Up'}
              </Button>
            </form>
          </Form>
          <p
            className='text-zinc-700'>
            Already have an account?
            <span
              onClick={() => router.push('/login')}
              className='text-zinc-300 underline cursor-pointer ml-2'>
              Login
            </span>
          </p>
        </div>
      )
      }
    </div >
  )
}

export default SignupPage
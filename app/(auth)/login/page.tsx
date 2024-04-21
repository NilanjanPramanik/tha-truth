'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { getSession, signIn } from 'next-auth/react'

import { LoginUser } from '@/schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { useRouter } from 'next/navigation';
import { toast } from 'react-toast';
import OAuthCard from '@/components/OAuthCard';

const LoginPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginUser>>({
    resolver: zodResolver(LoginUser),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof LoginUser>) => {
    setIsLoading(true);

    signIn('credentials', {
      ...values,
      redirect: false
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          router.push('/');
          toast.success("Logged in successfully.")
        }
        if (callback?.error) {
          toast.error(callback.error)
        }
      })
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
    <div className=' w-screen h-screen flex flex-col items-center justify-center p-8 gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2 w-full md:w-[400px]">
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
              <ClipLoader
                color='#ffffff'
                size={20}
                speedMultiplier={1.5}
              />
            ) : 'Sign In'}
          </Button>
        </form>
      </Form>
      <p
        className='text-zinc-700'>
        Dont have account?
        <span
          onClick={() => router.push('/signup')}
          className='text-zinc-300 underline cursor-pointer ml-2'>
          Sign up
        </span>
      </p>
      <OAuthCard />
    </div>
  )
}

export default LoginPage
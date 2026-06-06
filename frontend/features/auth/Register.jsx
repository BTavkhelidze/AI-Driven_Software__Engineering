'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { RegisterSchema } from '../schemas/RegisterSchema'; // Ensure this matches your schema
import { registerUser } from '../api/auth';



import { Input } from '../../src/components/ui/input';
import { cn } from '../../src/lib/utils';
import { toast } from 'react-toastify';
import { Label } from '../../src/components/ui/label';

export default function Register() {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Registered successfully!');
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    mutate(userData);
  };

  return (
    <div className='shadow-input mx-auto w-full max-w-md rounded-none bg-gray-300 p-4 md:rounded-2xl md:p-8 '>
      <h2 className='text-xl font-bold text-neutral-300 dark:text-neutral-200'>Welcome to AlphaZone</h2>
      
      <FormProvider {...form}>
        <form className='my-8' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            <LabelInputContainer>
              <Label htmlFor='firstName'>First name</Label>
              <Input id='firstName' type='text' {...form.register('firstName')} />
              {form.formState.errors.firstName && <p className='text-sm text-red-500'>{form.formState.errors.firstName.message}</p>}
            </LabelInputContainer>
            
            <LabelInputContainer>
              <Label htmlFor='lastName'>Last name</Label>
              <Input id='lastName' type='text' {...form.register('lastName')} />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input id='email' type='email' {...form.register('email')} />
            {form.formState.errors.email && <p className='text-sm text-red-500'>{form.formState.errors.email.message}</p>}
          </LabelInputContainer>

          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' {...form.register('password')} />
            {form.formState.errors.password && <p className='text-sm text-red-500'>{form.formState.errors.password.message}</p>}
          </LabelInputContainer>

          <LabelInputContainer className='mb-8'>
            <Label htmlFor='confirmPassword'>Confirm password</Label>
            <Input id='confirmPassword' type='password' {...form.register('confirmPassword')} />
            {form.formState.errors.confirmPassword && <p className='text-sm text-red-500'>{form.formState.errors.confirmPassword.message}</p>}
          </LabelInputContainer>

          <button
            className='h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white font-medium'
            type='submit'
            disabled={isPending}
          >
            {isPending ? 'Signing up...' : 'Sign up →'}
            <BottomGradient />
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

const BottomGradient = () => (
  <span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition group-hover/btn:opacity-100' />
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>
);
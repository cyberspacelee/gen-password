'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Slider } from './ui/slider';
import { useState } from 'react';
import { BACKEND_URL } from '@/lib/constants';
import { useGenPass } from '@/lib/store';

const FormSchema = z
  .object({
    passwdLength: z.number().int().min(1).max(100).default(8),
    isIncludeUpperCaseLatters: z.boolean().default(false).optional(),
    isIncludeLowerCaseLatters: z.boolean().default(false).optional(),
    isIncludeNumbers: z.boolean().default(false).optional(),
    isIncludeSymbols: z.boolean().default(false).optional(),
  })
  .refine(
    (data) =>
      data.isIncludeUpperCaseLatters ||
      data.isIncludeNumbers ||
      data.isIncludeLowerCaseLatters,
    {
      message:
        'Passwords contain at least one of uppercase letters, lowercase letters, and numbers',
      path: ['isIncludeNumbers'],
    },
  );

const PasswdConfig = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      passwdLength: 8,
      isIncludeUpperCaseLatters: false,
      isIncludeLowerCaseLatters: false,
      isIncludeNumbers: true,
      isIncludeSymbols: false,
    },
  });

  const updatePassword = useGenPass((state) => state.updatePassword);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsFetching(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/genPass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const { data } = await res.json();
        updatePassword(data);
      }
    } catch (error) {
      console.error('Failed to generate password', error);
    } finally {
      setIsFetching(false);
    }
  }
  const [length, setLength] = useState<number>(8);
  const handleLengthChange = (
    values: number[],
    field: ControllerRenderProps,
  ) => {
    setLength(values[0]);
    field.onChange(values[0]);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-lg border p-4"
      >
        <div className="flex flex-col pb-2">
          <FormField
            control={form.control}
            name="passwdLength"
            render={({ field }) => (
              <FormItem>
                <div className="p-2">
                  <div className="flex w-full items-center justify-between">
                    <FormLabel>Password Length</FormLabel>
                    <div className="p-1 font-semibold">{length}</div>
                  </div>
                  <FormControl>
                    <Slider
                      defaultValue={[length]}
                      max={100}
                      min={1}
                      step={1}
                      onValueChange={(values) => {
                        handleLengthChange(values, field);
                      }}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeUpperCaseLatters"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between p-2">
                  <FormLabel>Include Uppercase Letters</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeLowerCaseLatters"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between p-2">
                  <FormLabel>Include Lowercase Letters</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeNumbers"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between p-2">
                  <FormLabel>Include Numbers</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage className="px-2 text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeSymbols"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between p-2">
                  <FormLabel>Include Symbols</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isFetching}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PasswdConfig;

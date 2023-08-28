'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
 
const formSchemaNew = z.object({
  username: z.string().min(2, "Username must contain between 2 and 20 characters")
                      .max(20, "Username must contain between 2 and 20 characters")
})

const formSchemaJoin = z.object({
  gamecode: z.string().length(8, "Code must contain exactly 8 characters"),
  username: z.string().min(2, "Username must contain between 2 and 20 characters")
                      .max(20, "Username must contain between 2 and 20 characters")
})

function NewGameForm() {

  const form = useForm<z.infer<typeof formSchemaNew>>({
    resolver: zodResolver(formSchemaNew),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaNew>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="w-4/6 mx-auto mt-10 mb-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <Button className="mx-auto bg-green-900" type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

function JoinGameForm() {

  const form = useForm<z.infer<typeof formSchemaJoin>>({
    resolver: zodResolver(formSchemaJoin),
    defaultValues: {
      username: "",
      gamecode: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaNew>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="w-4/6 mx-auto mt-10 mb-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="gamecode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Game code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <Button className="mx-auto bg-green-900" type="submit">Join</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default function StartForms() {

  return (
    <Tabs defaultValue="new" className="w-full">
    <TabsList className="w-full">
      <TabsTrigger className="w-full" value="new">New</TabsTrigger>
      <TabsTrigger className="w-full" value="join">Join</TabsTrigger>
    </TabsList>
    <TabsContent value="new" className="">
      <NewGameForm/>
    </TabsContent>
    <TabsContent value="join">
      <JoinGameForm/>
    </TabsContent>
  </Tabs>
  )
}
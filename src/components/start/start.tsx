'use client'

// Imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useContext, useState } from "react"
import { wsContext } from "@/contexts/ws-context"
import { useForm } from "react-hook-form"

// Component imports
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

// Define form schemas
const formSchemaNew = z.object({
  username: z.string().min(2, "Username must contain between 2 and 15 characters")
                      .max(15, "Username must contain between 2 and 15 characters")
})
const formSchemaJoin = z.object({
  gamecode: z.string().length(8, "Code must contain exactly 8 characters"),
  username: z.string().min(2, "Username must contain between 2 and 15 characters")
                      .max(15, "Username must contain between 2 and 15 characters")
})

// Schema types
type formTypeNew = z.infer<typeof formSchemaNew>
type formTypeJoin = z.infer<typeof formSchemaJoin>
type formType = formTypeNew | formTypeJoin

function StartForm({variant}: {variant: "new" | "join"}) {

  // Hooks
  const { connect }  = useContext(wsContext)
  const [loading, setLoading] = useState(false)
  const form = useForm<formType>({
    resolver: zodResolver(variant=="new" ? formSchemaNew: formSchemaJoin),
    defaultValues: {
      username: "",
      gamecode: ""
    },
  })

  async function onSubmit(values: formType) {

    setLoading(true)
    
    // Connect to backend
    try {
      await connect(values.username, (values as formTypeJoin).gamecode)
    } catch (e: any) {
      // Display error
       if (e.reason == "no-game") {
        form.setError("gamecode", {type: "custom", message: "Game does not exist."})
      } else if (e.reason == "game-full") {
        form.setError("gamecode", {type: "custom", message: "Game is currently full."})
      } else if (e.reason == "username") {
        form.setError("username", {type: "custom", message: "Username already taken in this game."})
      } else {
        form.setError("username", {type: "custom", message: "Unable to connect. Try again later."})
      }
      setLoading(false)
    }
  }

  return (
    <div className="w-4/6 mx-auto mt-10 mb-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {variant == "join" && 
          (<FormField
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
          />)}
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
            <Button className="mx-auto bg-green-900" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {variant == "new" ? "Create" : "Join"}
              </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}


export default function Start() {

  return (
    <Tabs defaultValue="new" className="w-full">
    <TabsList className="w-full">
      <TabsTrigger className="w-full" value="new">New</TabsTrigger>
      <TabsTrigger className="w-full" value="join">Join</TabsTrigger>
    </TabsList>
    <TabsContent value="new" className="">
      <StartForm variant="new"/>
    </TabsContent>
    <TabsContent value="join">
    <StartForm variant="join"/>
    </TabsContent>
  </Tabs>
  )
}
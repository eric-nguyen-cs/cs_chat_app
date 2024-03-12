"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newMessageSchema = z.object({
  newMessage: z.string().trim().min(1),
});

export function AddMessage() {
  const form = useForm<z.infer<typeof newMessageSchema>>({
    resolver: zodResolver(newMessageSchema),
    defaultValues: {
      newMessage: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newMessageSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FormField
          control={form.control}
          name="newMessage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="self-end"
          type="submit"
          disabled={!form.formState.isValid}
        >
          Send message
        </Button>
      </form>
    </Form>
  );
}

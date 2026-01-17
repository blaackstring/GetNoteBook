import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./form";
import Input from "./InputField";
import { useMessageMutation } from "@/hooks/mutation.js";
import { UseMsg } from "@/context/MessageContext";
import { useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

export default function ChatInput({ sources }) {
  const { Message, setMessage } = UseMsg();
  const mutate = useMessageMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: Message || "",
    },
  });

  const watchedMessage = form.watch("message");

  // Sync with context iof needed, but primarily for initial load/persistence
  useEffect(() => {
    setMessage(watchedMessage);
  }, [watchedMessage, setMessage]);

  function onSubmit(values) {
    if (!values.message.trim()) return;
    if (sources.length === 0) return;

    mutate.mutate(values.message);
    form.reset({ message: "" });
  }

  const isLoading = mutate.isPending;

  return (
    <motion.div className="p-4 border-t border-gray-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
          <div className="flex-1 relative">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormControl>
                    <Input
                      placeholder={
                        sources.length === 0
                          ? "Upload a source first"
                          : "Type your message..."
                      }
                      disabled={sources.length === 0 || isLoading}
                      className="bg-transparent border-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto shadow-none"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <motion.span
            className="text-xs text-gray-400 shrink-0 mr-2"
            key={sources.length}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {sources.length} sources
          </motion.span>

          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={sources.length === 0 || isLoading || !watchedMessage}
            className="h-8 w-8 text-white hover:bg-gray-700 hover:text-white"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import RagButton from "./RagButton";
import { UseMsg } from "@/context/MessageContext";
import { useMessageMutation } from "@/hooks/mutation.js";

export default function ChatInput({
  sources
}) {
  const {Message,setMessage}=UseMsg()
  const mutate = useMessageMutation();
  return (
    <motion.div className="p-4 border-t border-gray-700">
      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
        <input
          type="text"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sources.length === 0}
          className="flex-1 bg-transparent text-white outline-none"
          placeholder={
            sources.length === 0
              ? "Upload a source"
              : "Type your message..."
          }
        />
           <motion.span 
            className="text-xs text-gray-400"
            key={sources.length}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {sources.length} sources
          </motion.span>
        <RagButton  mutate={mutate}/>
      </div>
    </motion.div>
  );
}

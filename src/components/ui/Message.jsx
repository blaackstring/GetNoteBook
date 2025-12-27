import { Userag } from "@/context/RagContext";
import { useMessageMutation } from "@/hooks/mutation";
import { useRagQuery } from "@/hooks/RagQueryHook";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, memo } from "react";

const messageVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const Messages = memo(({ Allanswers = [], streamingMessage }) => {
  const bottomRef = useRef(null);
  const {isStreaming}=useRagQuery()
  const mutation=useMessageMutation();


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isStreaming, Allanswers.length, streamingMessage]);

  return (
    <div className="w-full flex flex-col gap-2 ">
   
        {Allanswers.length > 0 ? (
          Allanswers.map((answer) => (
            <div
              key={answer.id ?? crypto.randomUUID()} // 🔑 stable key
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="w-full p-2 flex flex-col  gap-2"
            >
              {/* ---------- Human Message ---------- */}
              {answer.human && (
                <div className="flex justify-end mb-1">
                  <span
                    className="
                      max-w-[70%]
                      bg-[#1A1D22]
                      text-white/60
                      px-4
                      py-2
                      rounded-2xl
                      rounded-br-none
                      text-sm
                      break-words
                      whitespace-pre-wrap
                      overflow-hidden
                    "
                  >
                    {answer.human}
                  </span>
                </div>
              )}

              {/* ---------- AI Message ---------- */}
            
           {mutation.isPending&&<LoaderCircle/>}
               {answer.Ai && (
                <div className="flex justify-start items-start pl-3">
                  <span
                    className="
                    
                      px-2
                      py-2
                      rounded-2xl
                      rounded-bl-none
                      text-sm
                
                      text-start
                    "
                  >
                    {answer.Ai}
                  </span>
                </div>
              )}
             </div>
           
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-center text-gray-400 text-sm mt-6"
          >
            Chat messages will appear here
          </motion.div>
        )}
        {streamingMessage && (
          <motion.div
            key="streaming-message"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="w-full p-2 flex flex-col min-h-[100px] gap-2"
          >
            <div className="flex justify-start items-start pl-3">
              <span
                className="
                    
                      px-2
                      py-2
                      rounded-2xl
                      rounded-bl-none
                      text-sm
                
                      text-start
                    "
              >
                {streamingMessage.Ai}
              </span>
            </div>
          </motion.div>
        )}
    

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
});

export default Messages;

import { Userag } from "@/context/RagContext";
import { motion } from "framer-motion";
import { useEffect, useRef, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const messageVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,//erfrfr
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

const Messages = memo(({ Allanswers = [] }) => {
  const bottomRef = useRef(null);
  const { isStreaming } = Userag();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isStreaming, Allanswers.length]);

  const lastMessage = Allanswers.length > 0 ? Allanswers[Allanswers.length - 1] : null;
  const showSkeleton = isStreaming && (!lastMessage || lastMessage.human || !lastMessage.Ai);

  return (
    <div className="w-full flex flex-col gap-2 ">
      {Allanswers.length > 0 ? (
        Allanswers.map((answer) => (
          <motion.div
            key={answer.id ?? crypto.randomUUID()}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            layout
            className="w-full p-2 flex flex-col gap-2"
          >
            {/* ---------- Human Message ---------- */}
            {answer.human && (
              <div className="flex justify-end mb-1">
                <span
                  className="
                      max-w-[70%]
                      bg-[#1A1D22]
                      text-gray-200
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
                      text-white
                    "
                >
                  {answer.Ai}
                </span>
              </div>
            )}
          </motion.div>
        ))
      ) : (
        !showSkeleton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-center text-gray-400 text-sm mt-6"
          >
            Chat messages will appear here
          </motion.div>
        )
      )}

      {showSkeleton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col space-y-2 pl-5 py-2 w-full max-w-[300px]"
        >
          <Skeleton className="h-4 w-3/4 bg-gray-700/50" />
          <Skeleton className="h-4 w-1/2 bg-gray-700/50" />
        </motion.div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
});

export default Messages;

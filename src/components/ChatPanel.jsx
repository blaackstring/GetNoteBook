import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useSources } from "../context/SourceContext";
import { Userag } from "@/context/RagContext";
import Messages from "./ui/Message";
import ChatInput from "./ui/ChatInputArea";
import { useRagQuery } from "@/hooks/RagQueryHook";
import { pdfUploadForEmbeddings } from "@/hooks/UploadDocsHook";
import { FetchTranscript } from "@/hooks/FetchTranscriptHook";
import "./chat.css";

const STORAGE_KEY = "isUploaded";

function ChatPanel() {

  const { sources } = useSources();

  const [isUploaded, setIsUploaded] = useState(false);

  const {
    Allanswers,
    streamingMessage,
  } = Userag();

  // ---------- safe localStorage helpers ----------
  const safeGet = (key) => {
    try {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const safeSet = (key, value) => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, value);
    } catch { }
  };

  const url =
    "https://d3a6qvndldqlr.cloudfront.net/2617a9b3-f957-4593-b6b4-12cf456268a1-.pdf";

  // ---------- initial read (ONLY ONCE) ----------
  useEffect(() => {
    setIsUploaded(safeGet(STORAGE_KEY) === "true");
  }, []);

  // ---------- mutation ----------
  const filemutate = useMutation({
    mutationFn: async () => {
      if (safeGet(STORAGE_KEY) === "true") return;

      await Promise.all([
        pdfUploadForEmbeddings(url),
        FetchTranscript("Ec19ljjvlCI"),
        FetchTranscript("Z_S0VA4jKes"),
      ]);
    },
    onSuccess: () => {
      safeSet(STORAGE_KEY, "true");
      setIsUploaded(true);
    },
  });

  const handleClick = () => {
    if (!isUploaded) filemutate.mutate();
  };

  const textReveal = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative lg:max-h-screen h-[90vh] flex-1 flex flex-col bg-[#22262B] rounded-2xl">

      {/* ---------- Loader ---------- */}
      {filemutate.isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ---------- START BUTTON ---------- */}
      {!isUploaded && !filemutate.isPending && (
        <button
          onClick={handleClick}
          className="m-2 px-4 py-2 bg-blue-600 rounded text-white"
        >
          Generate Embeddings
        </button>
      )}

      {isUploaded && (
        <button
          onClick={() => {

            window.localStorage.removeItem(STORAGE_KEY)
            window.location.reload();
          }}
          className="m-2 px-4 py-2 text-md font-mono bg-blue-600 rounded text-white"
        >
          Tap if Not Uploaded...only
        </button>
      )}

      {/* ---------- CHAT UI ---------- */}
      {isUploaded && (
        <>
          <motion.div
            className="p-4 border-b border-gray-700 flex justify-between items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="text-xl font-display font-semibold"
              variants={textReveal}
              initial="hidden"
              animate="visible"
            >
              Chat
            </motion.h2>
          </motion.div>

          <div className="flex-1 overflow-y-auto p-4 bg-[#22262B] flex flex-col">
            <AnimatePresence mode="wait">
              {sources.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-gray-400"
                >
                  Add a source to get started.
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="hide-scrollbar w-full space-y-4 overflow-auto"
                >
                  {Allanswers?.length > 0 ? (
                    <Messages
                      Allanswers={Allanswers}
                      streamingMessage={streamingMessage}
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      Chat Messages Appear Here
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ChatInput sources={sources} />
        </>
      )}
    </div>
  );
}

export default ChatPanel;

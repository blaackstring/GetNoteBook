import { Userag } from "../context/RagContext.jsx";
import { useCallback, useRef } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const useRagQuery = () => {
  const eventSourceRef = useRef(null);
  const { setAllanswers, setStreamingMessage, isStreaming, setIsStreaming } = Userag();

  const cleanup = useCallback(() => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
    setIsStreaming(false);
    setStreamingMessage(null);
  }, [setStreamingMessage, setIsStreaming]);

  const startStreaming = useCallback((jobId) => {
    if (eventSourceRef.current) return;

    const es = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/api/v1/rag_query/stream/${jobId}/${uuid()}`);
    eventSourceRef.current = es;
    // setIsStreaming(true); // Already set in startRagQuery, but safe to keep or remove.

    let typingQueue = [];
    let isTyping = false;


    setAllanswers(prev => [...prev, { Ai: "" }]);

    es.onmessage = (e) => {

      const newPart = normalizeStreamText(e.data);
      console.log(e.data)
      for (const char of newPart) {
        typingQueue.push(char);
      }

      if (!isTyping) {
        startTyping();
      }
    };

    function startTyping() {
      isTyping = true;

      const interval = setInterval(() => {
        if (typingQueue.length === 0) {
          clearInterval(interval);
          isTyping = false;
        } else {
          const nextChar = typingQueue.shift();
          console.log(nextChar);

          setAllanswers(prev => {
            const updated = [...prev];
            for (let i = updated.length - 1; i >= 0; i--) {
              if (updated[i].Ai !== undefined) {
                updated[i] = {
                  ...updated[i],
                  Ai: updated[i].Ai + nextChar
                };
                break;
              }
            }

            return updated;
          });

        }
      }, 10);
    }

    es.addEventListener("end", cleanup);
    es.onerror = cleanup;
  }, [cleanup, setAllanswers, setIsStreaming]);

  function normalizeStreamText(text) {
    return text
      .replace(/Document\s*\d+\s*:/gi, "")
      .replace(/Document\s*\d+\s*Document\s*\d+/gi, "")
      .replace(/\*\s*/g, "• ")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s{2,}/g, " ")
      .replace(/•\s*\n/g, "• ")
      .trim();
  }

  const startRagQuery = async (query) => {
    try {
      setIsStreaming(true); // Set loading immediately
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/rag_query/start`, { query }, {
        headers: { "Content-Type": "application/json" }
      });

      const jobId = res.data.jobId;
      startStreaming(jobId);
      return jobId;
    } catch (error) {
      console.log("Error while starting rag query", error);
      setIsStreaming(false); // Reset on error
    }
  };

  return { startRagQuery, isStreaming };
};

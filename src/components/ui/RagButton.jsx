import { UseMsg } from "../../context/MessageContext.jsx";
import { Userag } from "../../context/RagContext.jsx";
import { useRagQuery } from "@/hooks/RagQueryHook";
import { Loader, MoveRightIcon } from "lucide-react";

export default function RagButton({ mutate }) {
  const { startRagQuery, isStreaming } = useRagQuery();
  const {Message,setMessage}=UseMsg();
 const {setAllanswers} =Userag()
  const handleClick = async () => {
    try {
        if(!Message) return;
        setAllanswers((prev)=>[...prev,{
            human:Message//erfrfr
        }]);
        setMessage('');
      const res = await mutate.mutateAsync(Message);
      console.log("Job started:", res);
    } catch (error) {
      console.error("Failed to start RAG:", error);
    }
  };

  return (
    <button
      disabled={isStreaming || mutate.isPending}
      onClick={handleClick}
    >
      {mutate.isPending ? <Loader/> : <MoveRightIcon className="bg-white text-black rounded-2xl"/>}
    </button>
  );
}

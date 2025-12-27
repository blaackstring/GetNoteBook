import { useMutation } from "@tanstack/react-query";
import { useRagQuery } from "./RagQueryHook";

export function useMessageMutation(message) {
  const { startRagQuery } = useRagQuery();

  const mutate = useMutation({
    mutationFn: async (message) => {
      return startRagQuery(message);
    },
  });

  return mutate;
}
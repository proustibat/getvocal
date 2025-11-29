import type { Flow } from "./types";
import {fetchFlows} from "./api";
import { useQuery } from "@tanstack/react-query";

export const useFlowsQuery = () => {
  return useQuery<Flow[]>({
    queryKey: ["flows"],
    queryFn: fetchFlows,
    staleTime: 1000,
  });
};

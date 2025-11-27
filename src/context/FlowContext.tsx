import type {Flow, Step} from "../features/flows/types.ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import {useFlowsQuery} from "../features/flows/useFlowsQuery.ts";


interface FlowContextValue {
  flows: Flow[];
  isLoading: boolean;
  getFlowById: (id: string|undefined) => Flow | undefined;
  updateStep: (
    flowId: string,
    stepId: string,
    patch: Partial<Step>,
  ) => void;
}

const FlowContext = createContext<FlowContextValue | null>(null);


export const FlowProvider = ({ children }: { children: React.ReactNode }) => {
  // fake fetch
  const { data, isLoading: isFetching } = useFlowsQuery();

  // init from localStorage
  const [flows, setFlows] = useState<Flow[]>(() => {
    const saved = localStorage.getItem("flows");
    return saved ? JSON.parse(saved) : [];
  });

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // after fetch: hydrate if no localStorage data
  useEffect(() => {
    if (!isFetching) {
      if (flows.length === 0 && data) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFlows(data);
        localStorage.setItem("flows", JSON.stringify(data));
      }
      setIsLoading(false);
    }
  }, [isFetching, data, flows.length]);


  // persistence
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("flows", JSON.stringify(flows));
    }
  }, [flows, isLoading]);

  // ACTIONS
  const updateStep = (flowId: string, stepId: string, patch: Partial<Step>) => {
    // should be a call to the api too
    setFlows(prev =>
      prev.map(flow =>
        flow.id !== flowId
          ? flow
          : {
            ...flow,
            steps: flow.steps.map(s =>
              s.id === stepId ? { ...s, ...patch } : s
            ),
          }
      )
    );
  };

  const getFlowById = (flowId: string | undefined) =>
    flows.find(f => f.id === flowId);

  return (
    <FlowContext.Provider value={{
      flows,
      isLoading,
      updateStep,
      getFlowById
    }}>
      {children}
    </FlowContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFlowsContext = () => {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlows must be used inside <FlowProvider />");
  return ctx;
};

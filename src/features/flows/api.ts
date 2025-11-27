import { type Flow } from "./types";
import flowsData from "mocks/flows.json";

const flows: Flow[] = flowsData as Flow[];

export const fetchFlows = async (): Promise<Flow[]> => {
  await new Promise(res => setTimeout(res, 3000));
  return flows;
};

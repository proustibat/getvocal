export type StepType = "message" | "question" | "decision";

export interface Step {
  id: string;
  label: string;
  type: StepType;
  content: string
}
export interface Flow {
  id: string;
  name: string;
  description: string;
  steps: Step[]
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  steps: Step[];
}
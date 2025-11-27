import {Card, Spinner} from "components/ui";
import { Link, useParams } from "react-router-dom";
import {useFlowsContext} from "../context/FlowContext";
import ReactMarkdown from "react-markdown";
import type {Step, StepType} from "../features/flows/types.ts";
import { useState } from "react";

export const FlowDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { updateStep, getFlowById, isLoading } = useFlowsContext();

  const flow = getFlowById(id);

  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const [editValues, setEditValues] = useState<Pick<Step, "label" | "type" | "content">>({
    label: "",
    type: "message",
    content: "",
  });

  // when a step is clicked: load fields in the edit form
  const handleSelectStep = (stepId: string) => {
    const step = flow?.steps.find((s) => s.id === stepId);
    if (!step) return;

    setSelectedStepId(stepId);
    setEditValues({
      label: step.label,
      type: step.type,
      content: step.content,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Spinner size={32} />
      </div>
    );
  }

  if (!flow) return <div>Flow not found</div>;

  const handleSave = () => {
    if (!selectedStepId) return;
    updateStep(flow.id, selectedStepId, editValues);
  };

  return (
    <div className="p-8 space-y-8">

      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to flows
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{flow.name}</h1>
        <span className="inline-block bg-slate-900 text-slate-50 text-xs px-3 py-1 rounded-full font-medium">
          {flow.steps.length} steps
        </span>
      </div>

      <Card key="description" className="p-4 bg-gray-100">
        <h2 className="font-bold mb-2">Description</h2>
        <pre className="whitespace-pre-wrap text-sm text-slate-700">
          {flow.description}
        </pre>
      </Card>

      {/* Steps + edit panel */}
      <Card key="edit-panel" className="p-4 space-y-4">
        <h2 className="font-bold">Steps</h2>

        <ul className="space-y-2">
          {flow.steps.map((step, index) => (
            <div key={step.id}>
              <li
                key={step.id}
                onClick={() => handleSelectStep(step.id)}
                className={`flex items-center justify-between border rounded-md px-4 py-2 shadow-sm cursor-pointer
                ${selectedStepId === step.id ? "bg-blue-50 border-blue-300" : "bg-white"}
              `}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {index + 1}. {step.label}
                  </span>
                  <span className="text-xs text-slate-500 italic">{step.type}</span>
                  <div className="prose prose-sm max-w-none mt-3">
                    <ReactMarkdown
                      components={{
                        h1: ({children}) => (
                          <h1 className="text-2xl font-bold mt-4 mb-2 text-indigo-700">
                            {children}
                          </h1>
                        ),
                        h2: ({children}) => (
                          <h2 className="text-lg font-bold mt-4 mb-2 text-indigo-700">
                            {children}
                          </h2>
                        ),
                        li: ({children}) => (
                          <li className="ml-6 list-disc text-gray-800">{children}</li>
                        ),
                      }}
                    >
                      {step.content}
                    </ReactMarkdown>
                  </div>
                </div>

              </li>

              {selectedStepId === step.id && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-semibold mb-4">Edit step</h3>

                  <div className="space-y-4">

                    {/* Label */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Label</label>
                      <input
                        type="text"
                        value={editValues.label}
                        onChange={(e) =>
                          setEditValues({...editValues, label: e.target.value})
                        }
                        className="border rounded-md px-3 py-2"
                      />
                    </div>

                    {/* Type */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Type</label>
                      <select
                        value={editValues.type}
                        onChange={(e) =>
                          setEditValues({...editValues, type: e.target.value as StepType})
                        }
                        className="border rounded-md px-3 py-2"
                      >
                        <option value="message">message</option>
                        <option value="question">question</option>
                        <option value="decision">decision</option>
                      </select>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Content</label>
                      <textarea
                        value={editValues.content}
                        onChange={(e) =>
                          setEditValues({...editValues, content: e.target.value})
                        }
                        rows={4}
                        className="border rounded-md px-3 py-2"
                      />
                    </div>

                    <button
                      onClick={handleSave}
                      className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800"
                    >
                      Save
                    </button>

                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </Card>
    </div>
  );
};

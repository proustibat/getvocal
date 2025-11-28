import {Button, Card, Spinner} from "components/ui";
import { Link, useParams } from "react-router-dom";
import {PlusStroke, Trash3Stroke} from "@lineiconshq/free-icons";
import StepForm, {type FormValues} from "../components/StepForm.tsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import ModalDialog from "../components/ui/ModalDialog.tsx";
import ReactMarkdown from "react-markdown";
import {createPortal} from "react-dom";
import {useFlowsContext} from "../context/FlowContext";
import { useState } from "react";


export const FlowDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { updateStep, getFlowById, isLoading, deleteStep, addStep } = useFlowsContext();

  const flow = getFlowById(id);

  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);


  const [showModalCreateStep, setShowModalCreateStep] = useState(false);

  // when a step is clicked: load fields in the edit form
  const handleSelectStep = (stepId: string) => {
    const step = flow?.steps.find((s) => s.id === stepId);
    if (!step) return;

    // toggle to close if already open
    if(selectedStepId === step.id) {
      setSelectedStepId(null);
      return;
    }

    setSelectedStepId(stepId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Spinner size={32} />
      </div>
    );
  }

  if (!flow) return <div>Flow not found</div>;


  const handleCreateForm = (data: FormValues) => {
    addStep(flow.id, data);
    setShowModalCreateStep(false);
  };


  const handleEditForm = (data: FormValues) => {
    if (!selectedStepId) return;
    updateStep(flow.id, selectedStepId, data);
    setSelectedStepId(null);
  };

  return (
    <>
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
          <div className="flex basis-full">
            <h2 className="font-bold flex-auto">Steps</h2>
            <Button variant="secondary" onClick={(e) => {
              e.stopPropagation();
              setShowModalCreateStep(true);
            }}><Lineicons icon={PlusStroke} size={20}/> Add a new step</Button>
          </div>

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

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStep(flow.id, step.id);
                    }}
                    className="ml-4 text-red-500 p-2 rounded-md hover:bg-red-50"
                    aria-label="Delete step"
                  >
                    <Lineicons icon={Trash3Stroke} size={24} strokeWidth={1.5}/>
                  </button>

                </li>


                {/*edit panel*/}
                {selectedStepId && selectedStepId === step.id && (
                  <Card className="mt-6 pt-6">
                    <StepForm
                      formId="update-step-form"
                      onSave={handleEditForm}
                      defaultValues={step}
                    />
                    <Button
                      type="submit"
                      form="update-step-form"
                    >
                      Save
                    </Button>
                  </Card>
                )}
              </div>
            ))}
          </ul>
        </Card>
      </div>
      {showModalCreateStep && createPortal(
        <ModalDialog formId="create-step-form" onClose={() => setShowModalCreateStep(false)}>
          <StepForm formId="create-step-form" onSave={handleCreateForm} />
        </ModalDialog>,
        document.body
      )}
    </>
  );
};

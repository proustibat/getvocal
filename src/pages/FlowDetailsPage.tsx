import {Button, Card, Spinner} from "components/ui";
import { Link, useParams } from "react-router-dom";
import {Pencil1Stroke, PlusStroke, Trash3Stroke} from "@lineiconshq/free-icons";
import StepForm, {type FormValues} from "../components/StepForm.tsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import ModalDialog from "../components/ui/ModalDialog.tsx";
import ReactMarkdown from "react-markdown";
import {type Step} from "features/flows/types.ts";
import {createPortal} from "react-dom";
import {useFlowsContext} from "../context/FlowContext";
import { useState } from "react";


export const FlowDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { updateStep, getFlowById, isLoading, deleteStep, addStep } = useFlowsContext();

  const flow = getFlowById(id);

  const [editingStep, setEditingStep] = useState<Step|null>(null);
  const [showModalCreateStep, setShowModalCreateStep] = useState(false);

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
    if (!editingStep) return;
    updateStep(flow.id, editingStep.id, data);
    setEditingStep(null);
  };

  return (
    <>
      <div className="p-8 space-y-8">

        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to flows
        </Link>

        <div className="space-y-2 flex flex-row justify-between items-start">
          <h1 className="text-2xl font-semibold tracking-tight">{flow.name}</h1>
          <p className="bg-slate-900 text-slate-50 text-xs px-3 py-1 rounded-full font-medium text-nowrap">
            {flow.steps.length} steps
          </p>
        </div>
        <Card key="description" className="p-4 bg-gray-100">
          <h2 className="font-bold mb-2">Description</h2>
          <p className="text-slate-700">
            {flow.description}
          </p>
        </Card>

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
                  className={`flex items-center justify-between border rounded-md px-4 py-2 shadow-sm cursor-pointer
                ${editingStep?.id === step.id ? "bg-blue-50 border-blue-300" : "bg-white"}
              `}
                >

                  <div className="w-full">
                    <div className="flex flex-row items-start justify-between">
                      <div className="w-fit">
                        <p className="text-lg font-medium">
                          {index + 1}. {step.label}
                        </p>
                        <p className="text-sm text-slate-500 italic">{step.type}</p>
                      </div>

                      <div className="flex flex-row gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingStep(step);
                          }}
                          className="text-slate-500 p-2 rounded-md hover:bg-slate-50"
                          aria-label="Edit step"
                        >
                          <Lineicons icon={Pencil1Stroke} size={24} strokeWidth={1.5}/>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteStep(flow.id, step.id);
                          }}
                          className="text-red-500 p-2 rounded-md hover:bg-red-50"
                          aria-label="Delete step"
                        >
                          <Lineicons icon={Trash3Stroke} size={24} strokeWidth={1.5}/>
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
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
              </div>
            ))}
          </ul>
        </Card>
      </div>

      {(showModalCreateStep || !!editingStep) && createPortal(
        <ModalDialog
          formId={`${showModalCreateStep ? "create":"update"}-step-form`}
          onClose={() => {
            showModalCreateStep
              ? setShowModalCreateStep(false)
              : setEditingStep(null);

          }}
        >
          <StepForm
            title={showModalCreateStep ? "Add a new step": "Edit step"}
            formId={`${showModalCreateStep ? "create":"update"}-step-form`}
            onSave={showModalCreateStep ? handleCreateForm : handleEditForm}
            defaultValues={editingStep ?? undefined}
          />
        </ModalDialog>,
        document.body
      )}
    </>
  );
};

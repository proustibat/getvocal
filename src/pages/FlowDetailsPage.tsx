import {Card, Spinner} from "components/ui";
import {Link, useParams } from "react-router-dom";
import {type MouseEvent, useState} from "react";
import StepForm, {type FormValues} from "../components/StepForm.tsx";
import AddButton from "../components/ui/AddButton.tsx";
import ModalDialog from "../components/ui/ModalDialog.tsx";
import NumberItemsTag from "../components/ui/NumberItemsTag.tsx";
import {type Step} from "features/flows/types.ts";
import StepCardItem from "../components/StepCardItem.tsx";
import {createPortal} from "react-dom";
import {useFlowsContext} from "../context/FlowContext";



export const FlowDetailsPage = () => {
  const {id} = useParams<{ id: string }>();
  const {updateStep, getFlowById, isLoading, deleteStep, addStep} = useFlowsContext();

  const flow = getFlowById(id);

  const [editingStep, setEditingStep] = useState<Step | null>(null);
  const [showModalCreateStep, setShowModalCreateStep] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Spinner size={32}/>
      </div>
    );
  }

  //  todo: improve that
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

  const handleClickAddStepButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowModalCreateStep(true);
  };

  return (
    <>
      <div className="p-8 space-y-8">

        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to flows
        </Link>

        <div className="space-y-2 flex flex-row justify-between items-start">
          <h1 className="text-2xl font-semibold tracking-tight">{flow.name}</h1>
          <NumberItemsTag value={flow.steps.length} singularWord="step" pluralWord="steps"/>
        </div>

        <Card key="description" title="Description">
          <p className="text-slate-700 text-sm">
            {flow.description}
          </p>
        </Card>

        <Card key="steps" className="p-4 space-y-4 relative w-full" title="Steps">
          {flow.steps.length > 0 && <AddButton className="absolute right-5 top-0" onClick={handleClickAddStepButton}>Add a new step</AddButton>}

          {/* fallback when there is no step, display a message with an add button */}
          {flow.steps.length === 0 && (
            <div className="flex flex-col justify-center items-center pb-2">
              <p className="tracking-tight mb-4">There are no steps here!</p>
              <AddButton onClick={handleClickAddStepButton}>Add a new one!</AddButton>
            </div>
          )}

          {/* steps list */}
          {
            flow.steps.length > 0 && (
              <ul className="space-y-2 pt-6">
                {
                  flow.steps.map((step, index) => (
                    <StepCardItem
                      key={step.id}
                      step={step}
                      index={index}
                      onDelete={() => {
                        deleteStep(flow.id, step.id);
                      }}
                      onEdit={() => {
                        setEditingStep(step);
                      }}
                    />
                  ))
                }
              </ul>
            )
          }
        </Card>
      </div>

      {/* This modal manages 2 cases: edit or create a step */}
      {(showModalCreateStep || !!editingStep) && createPortal(
        <ModalDialog
          formId={`${showModalCreateStep ? "create" : "update"}-step-form`}
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

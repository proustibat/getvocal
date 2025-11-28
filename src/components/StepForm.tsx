import {Card} from "./ui";
import FormInput from "./ui/FormInput.tsx";
import FormLabel from "./ui/FormLabel.tsx";
import FormSelect from "./ui/FormSelect.tsx";
import FormTextarea from "./ui/FormTextarea.tsx";
import {useForm} from "react-hook-form";

type StepFormProps = {
  formId: string
  onSave: (data: FormValues)=>void;
  defaultValues?: FormValues;
};

export type FormValues = {
  label: string;
  type: "question" | "message" | "decision";
  content: string;
};

const StepForm = ({formId, onSave, defaultValues}: StepFormProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValues>({defaultValues});

  return (
    <Card className="mb-2">
      <h1 className="text-2xl uppercase mb-4">Add a new step</h1>
      <form
        id={formId}
        onSubmit={handleSubmit(onSave)}
        className="px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-8">
          <FormLabel text="Label" id="label" />
          <FormInput id="label" register={register} required="Please enter a label" error={errors.label?.message} />
        </div>

        <div className="mb-8">
          <FormLabel text="Type" id="type" />
          <FormSelect
            id="type"
            options={[
              {value: "message", text: "Message"},
              {value: "question", text: "Question"},
              {value: "decision", text: "Decision"}
            ]}
            register={register}
            required="Please select a type"
            error={errors.type?.message}
            placeholder="Choose a type"
          />
        </div>

        <div className="mb-8">
          <FormLabel text="Content" id="content" />
          <FormTextarea id="content" register={register} required="Please define a content for your step" error={errors.content?.message}/>
        </div>
      </form>
    </Card>
  );

};

export default StepForm;
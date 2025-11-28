import {Card} from "./ui";
import { useForm } from "react-hook-form";

type CreateStepFormProps = {
  formId: string
  onSaved: ()=>void;
};

const CreateStepForm = ({formId, onSaved}: CreateStepFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      label: "",
      type: "",
      content: ""
    }
  });
    
  return (
    <Card className="mb-2">
      <h1 className="text-2xl uppercase mb-4">Add a new step</h1>
      <form
        id={formId}
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
          onSaved();
        })}
        className="px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-8">
          <label
            htmlFor="label"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Label
          </label>
          <input
            id="label"
            type="text"
            {...register(
              "label",
              {required: true}
            )}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                ${errors.label && "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"}`
            }
          />
          {errors.label && <p className="text-red-500 text-xs italic">Please choose a label for the step</p>}
        </div>

        <div className="mb-8">
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Type
          </label>
          <input
            id="type"
            type="text"
            placeholder={`"question" / "message" / "decision"`}
            {...register(
              "type",
              {required: true}
            )}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
            ${errors.type && "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"}`
            }
          />
          {errors.type && <p className="text-red-500 text-xs italic">Please choose a type for your step</p>}
        </div>

        <div className="mb-8">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            {...register(
              "content",
              {required: true}
            )}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-[4px]
            ${errors.content && "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"}`
            }
          />
          {errors.content && <p className="text-red-500 text-xs italic">Please define a content</p>}
        </div>
      </form>
    </Card>
  );

};

export default CreateStepForm;
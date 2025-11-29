import {Pencil1Stroke, Trash3Stroke} from "@lineiconshq/free-icons";
import {Lineicons} from "@lineiconshq/react-lineicons";
import ReactMarkdown from "react-markdown";
import type {Step} from "../features/flows/types.ts";

type StepCardItemProps = {
  step: Step;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
};

const StepCardItem = ({step, index, onEdit, onDelete}: StepCardItemProps) => {
  return (
    <div key={step.id}>
      <li
        key={step.id}
        className="flex items-center justify-between border rounded-md px-4 py-2 shadow-sm cursor-pointer bg-white"
      >

        <div className="w-full text-gray-600">
          <div className="flex flex-row items-start justify-between">
            <div className="w-full">
              <h1 className="text-xl font-bold ">
                {index + 1} ‣ {step.label}
              </h1>
              <p className="text-sm font-bold mt-4 flex w-full justify-start items-center">
                <span>Type: </span>
                <span
                  className="ml-2 italic border-2 border-dotted rounded-2xl px-2 py-1 font-normal">{step.type}</span>
              </p>
            </div>

            <div className="flex flex-row gap-2">
              <button
                onClick={onEdit}
                className="text-slate-500 p-2 rounded-md hover:bg-slate-50"
                aria-label="Edit step"
              >
                <Lineicons icon={Pencil1Stroke} size={24} strokeWidth={1.5}/>
              </button>

              <button
                onClick={onDelete}
                className="text-red-500 p-2 rounded-md hover:bg-red-50"
                aria-label="Delete step"
              >
                <Lineicons icon={Trash3Stroke} size={24} strokeWidth={1.5}/>
              </button>
            </div>
          </div>

          <p className="text-sm font-bold mt-4 flex w-full justify-start items-center">
            Content:
          </p>
          <div className="mt-3 mb-2 text-sm p-4 border-dashed border-2 text-gray-400">
            <ReactMarkdown
              components={{
                h1: ({children}) => (
                  <h1 className="text-2xl font-bold tracking-tight mb-2 ">
                    {children}
                  </h1>
                ),
                h2: ({children}) => (
                  <h2 className="text-xl font-bold tracking-tight mt-4 mb-2">
                    {children}
                  </h2>
                ),
                h3: ({children}) => (
                  <h3 className="text-md font-bold tracking-tight mt-4 mb-2">
                    {children}
                  </h3>
                ),
                li: ({children}) => (
                  <li className="ml-6 list-disc text-gray-400 list my-1 list">{children}</li>
                ),
              }}
            >
              {step.content}
            </ReactMarkdown>
          </div>
        </div>
      </li>
    </div>
  );
};

export default StepCardItem;
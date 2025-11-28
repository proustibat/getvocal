import {Card} from "./ui";

type CreateStepFormProps = {};

const CreateStepForm = ({}: CreateStepFormProps) => {
  return (
    <Card className="mb-2">
      <h1 className="text-2xl uppercase">Add a new step</h1>
      <div>Here should be the form</div>
    </Card>
  );

};

export default CreateStepForm;
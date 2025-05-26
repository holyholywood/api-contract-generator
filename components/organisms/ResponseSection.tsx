import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import React, { memo } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";
import TextEditor from "../molecules/TextEditor";

interface reponseSectionProps {
  responses: {
    code: number;
    title: string;
    description: string;
    body: string;
  }[];
  setResponses: (
    index: number,
    data: {
      code: number;
      title: string;
      description: string;
      body: string;
    }
  ) => void;
}
const ResponseSection = memo(({ responses, setResponses }: reponseSectionProps) => {
  return (
    <div className="space-y-8">
      <h2 className="font-medium">Response Body</h2>
      {responses.map((response, index) => (
        <ResponseBodyInput canRemove={responses.length > 1} key={index} index={index} setResponses={setResponses} {...response} />
      ))}
      <Button
        onPress={() => {
          setResponses(responses.length, { body: "", code: 200, description: "", title: "" });
        }}
        disabled={responses.length < 1}
        isDisabled={responses.length < 1}
        size="sm"
        startContent={<RiAddLine />}
        className="mx-auto flex"
        color="primary"
        variant="bordered"
      >
        Add Response
      </Button>
    </div>
  );
});

export default ResponseSection;

type responseBodyInputProps = {
  canRemove?: boolean;
  index: number;
  code: number;
  title: string;
  description: string;
  body: string;
  setResponses: (
    index: number,
    data: {
      code: number;
      title: string;
      description: string;
      body: string;
    }
  ) => void;
};
const ResponseBodyInput = ({ index, setResponses, canRemove, ...response }: responseBodyInputProps) => {
  return (
    <>
      <div className="flex justify-between items-end pb-8">
        <Input
          isRequired
          className="max-w-[8rem]"
          label="HTTP Code"
          placeholder="eg: 200, 404"
          type="number"
          min={100}
          max={599}
          value={String(response.code)}
          onChange={(e) => setResponses(index, { ...response, code: Number(e.target.value) })}
          labelPlacement="outside"
        />
        <Button disabled={!canRemove} isDisabled={!canRemove} color="danger">
          <RiDeleteBinLine />
          Remove
        </Button>
      </div>
      <Input
        variant="faded"
        className="max-w-2xl"
        label="Title"
        isRequired
        placeholder="e.g: Expected Response Condition"
        labelPlacement="outside"
        value={response.title}
        onChange={(e) => setResponses(index, { ...response, title: e.target.value })}
      />
      <Textarea
        variant="faded"
        label="Description"
        labelPlacement="outside"
        value={response.description}
        onChange={(e) => setResponses(index, { ...response, description: e.target.value })}
      />
      <TextEditor
        label="Body"
        isRequired
        body={response.body}
        onChange={(val) => {
          setResponses(index, { ...response, body: val });
        }}
      />
    </>
  );
};

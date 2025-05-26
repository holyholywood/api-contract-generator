import { Checkbox, Divider, Textarea } from "@nextui-org/react";
import { useState } from "react";
import TextEditor from "../molecules/TextEditor";

interface reqBodySection {
  reqBody: {
    reqBody: string;
    description: string;
  };
  handler: (reqBody: { reqBody: string; description: string }) => void;
}
const RequestBodySection = ({ handler, reqBody }: reqBodySection) => {
  const [isHasReqBody, setIsHasReqBody] = useState(false);
  const [body, setBody] = useState("");
  return (
    <div className="space-y-8 ">
      <Checkbox
        checked={isHasReqBody}
        onChange={(e) => {
          setIsHasReqBody(e.target.checked);
          if (!e.target.checked) {
            handler({ description: "", reqBody: "" });
          }
        }}
      >
        <span className="text-sm text-default-500">Has Request Body</span>
      </Checkbox>
      {isHasReqBody && (
        <>
          <h2 className="font-medium">Request Body</h2>
          <Textarea
            variant="faded"
            label="Description"
            labelPlacement="outside"
            value={reqBody.description}
            onChange={(e) => handler({ ...reqBody, description: e.target.value })}
          />
          <TextEditor body={reqBody.reqBody} onChange={(e) => handler({ ...reqBody, reqBody: e })} minHeight={24} />
        </>
      )}
    </div>
  );
};

export default RequestBodySection;

import { HTTPMethodOptioType } from "@/resources/options";
import { useState } from "react";

const useCreateApiContract = () => {
  const [baseURL, setBaseURL] = useState<string>("");
  const [endpoint, setEndPoint] = useState<string>("");
  const [method, setMethod] = useState<HTTPMethodOptioType>("GET");
  const [params, setParams] = useState<{ name: string; type: "string" | "integer" }[]>([]);
  const [query, setQuery] = useState<
    { key: string; example: string; type: "string" | "integer" | "array-comma" | "array-multi"; option: string[] }[]
  >([]);
  const [responses, setResponses] = useState<{ code: number; title: string; description: string; body: string }[]>([
    {
      body: "",
      code: 200,
      description: "",
      title: "",
    },
  ]);

  function onEndPointChange(val: string) {
    const segmentList = extractEndpointSegmentFromString(val);
    setEndPoint(val);
    if (segmentList.length > 0) {
      setParams(
        segmentList.map((segment) => ({
          name: segment,
          type: "string",
        }))
      );
    }
  }
  function onTypeParamChange(index: number, type: "string" | "integer") {
    const clonedParams = params;
    clonedParams[index].type = type;
    setParams([...clonedParams]);
  }
  function onResponseDataChange(index: number, data: { code: number; title: string; description: string; body: string }) {
    const clonedResponse = responses;
    clonedResponse[index] = data;
    setResponses([...clonedResponse]);
  }
  async function handleSubmit() {}

  return {
    STATE: {
      baseURL,
      setBaseURL,
      endpoint,
      setEndPoint: onEndPointChange,
      method,
      setMethod,
      params,
      setParams: onTypeParamChange,
      query,
      setQuery,
      responses,
      setResponses: onResponseDataChange,
    },
    HANDLER: { handleSubmit },
  };
};

export default useCreateApiContract;

function extractEndpointSegmentFromString(inputString: string): string[] {
  const slugsRegex = /\/:([^/]+)/g;
  const slugs: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = slugsRegex.exec(inputString)) !== null) {
    slugs.push(match[1]);
  }

  return slugs;
}

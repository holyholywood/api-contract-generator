import ClientAPIContractService from "@/lib/client/service";
import { HTTPMethodOptioType } from "@/resources/options";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { apiContract, queryInputType } from "./type";

const useEditApiContract = (id: string, data: apiContract) => {
  const [title, setTitle] = useState<string>(data.title);
  const [baseURL, setBaseURL] = useState<string>(data.baseURL);
  const [endpoint, setEndPoint] = useState<string>(data.endpoint);
  const [method, setMethod] = useState<HTTPMethodOptioType>(data.method);
  const [params, setParams] = useState<{ name: string; type: "string" | "number"; description: string }[]>(data.params ?? []);
  const [query, setQuery] = useState<queryInputType[]>(data.query ?? []);
  const [reqBody, setReqBody] = useState(data.reqBody);
  data.query;
  const [responses, setResponses] = useState<{ code: number; title: string; description: string; body: string }[]>(
    data.responses ?? [
      {
        body: "",
        code: 200,
        description: "",
        title: "",
      },
    ]
  );

  function onEndPointChange(val: string) {
    const segmentList = extractEndpointSegmentFromString(val);
    setEndPoint(val);
    if (segmentList.length > 0) {
      setParams(
        segmentList.map((segment) => ({
          name: segment,
          type: "string",
          description: "",
        }))
      );
    }
  }
  const onTypeParamChange = useCallback(
    (index: number, data: { description: string; type: "string" | "number" }) => {
      const clonedParams = params;
      clonedParams[index] = { ...clonedParams[index], ...data };
      setParams([...clonedParams]);
    },
    [params]
  );

  const onQueryChange = useCallback(
    (index: number, data: queryInputType) => {
      const clonedQuery = query;
      clonedQuery[index] = data;
      setQuery([...clonedQuery]);
    },
    [query]
  );

  const onQueryOptionChange = useCallback(
    (index: number, options: string[]) => {
      const clonedQuery = query;
      clonedQuery[index] = { ...clonedQuery[index], option: options };
      setQuery([...clonedQuery]);
    },
    [query]
  );

  const onRemoveQuery = useCallback(
    (index: number) => {
      setQuery([...query.filter((item, itemIndex) => itemIndex !== index)]);
    },
    [query]
  );

  function onAddQuery() {
    setQuery([
      ...query,
      {
        key: "",
        example: "",
        type: "string",
        option: [],
      },
    ]);
  }

  const onResponseDataChange = useCallback(
    (index: number, data: { code: number; title: string; description: string; body: string }) => {
      const clonedResponse = responses;
      clonedResponse[index] = data;
      setResponses([...clonedResponse]);
    },
    [responses]
  );
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = useMemo(
    () => Boolean(title) && Boolean(endpoint) && Boolean(responses.length) && Boolean(method),
    [title, method, endpoint, responses.length]
  );
  async function handleSubmit() {
    setIsError(false);
    if (isFormValid) {
      setIsLoading(true);
      const data = { method, title, baseURL, endpoint, reqBody, query: queryPayloadParser(query), params, responses };
      try {
        const result = await ClientAPIContractService.edit(id, data);
        router.push("/" + result);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
  }

  return {
    STATE: {
      title,
      setTitle,
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
      reqBody,
      setReqBody,
      responses,
      setResponses: onResponseDataChange,
    },
    UI: { isError, setIsError, isLoading },
    HANDLER: {
      handleSubmit,
      query: {
        onQueryChange,
        onQueryOptionChange,
        onAddQuery,
        onRemoveQuery,
      },
    },
  };
};

export default useEditApiContract;

function extractEndpointSegmentFromString(inputString: string): string[] {
  const slugsRegex = /\/:([^/]+)/g;
  const slugs: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = slugsRegex.exec(inputString)) !== null) {
    slugs.push(match[1]);
  }

  return slugs;
}

function queryPayloadParser(queries: queryInputType[]): queryInputType[] {
  return queries.map((item) => ({
    ...item,
    example: item.type === "number" ? Number(item.example) : item.example,
  }));
}

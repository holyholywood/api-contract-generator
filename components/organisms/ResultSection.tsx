import { HTTPMethodOptioType } from "@/resources/options";
import { Button, Code, Divider, Snippet } from "@nextui-org/react";
import React from "react";

interface props {
  title: string;
  baseURL: string;
  endpoint: string;
  method: HTTPMethodOptioType;
  params: Array<{
    name: string;
    type: "string" | "integer";
  }>;
  query: Array<{
    key: string;
    example: string;
    type: "string" | "integer" | "array-comma" | "array-multi";
    option: string[];
  }>;
  responses: Array<{
    code: number;
    title: string;
    description: string;
    body: string;
  }>;
}
const ResultSection = ({ title, baseURL, endpoint, method, params, query, responses }: props) => {
  return (
    <div className="min-h-screen max-w-5xl mx-auto space-y-8 pb-40">
      <h1 className="text-xl font-semibold">Result</h1>
      <div className="border rounded-sm border-primary-500 min-h-screen max-w-5xl mx-auto p-8 space-y-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        <Divider className="!my-10" />
        <div className="flex items-center gap-4">
          <Button as="div" radius="sm" disabled color={getMethodColor(method)} className="!font-semibold tracking-wider text-white min-w-32">
            {method}
          </Button>
          <Snippet size="sm" radius="sm" symbol="" className="min-w-[20rem]">
            {endpoint}
          </Snippet>
        </div>
        <span className="text-sm">Full URL : </span>
        <Code radius="sm">{baseURL + endpoint}</Code>
      </div>
    </div>
  );
};

export default ResultSection;

function getMethodColor(method: HTTPMethodOptioType) {
  switch (method) {
    case "GET":
      return "success";
    case "POST":
      return "warning";
    case "PATCH":
      return "secondary";
    case "PUT":
      return "secondary";
    case "DELETE":
      return "danger";

    default:
      return "default";
  }
}

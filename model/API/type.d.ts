import { HTTPMethodOptioType } from "@/resources/options";

export type apiContract = {
  id?: readonly string;
  baseURL: string;
  title: string;
  endpoint: string;
  method: HTTPMethodOptioType;
  reqBody: {
    reqBody: string;
    description: string;
  };
  params?: { name: string; type: "string" | "number"; description: string }[];
  query?: { key: string; example: string | number; type: "string" | "number" | "array-comma" | "array-multi"; option: string[] }[];
  responses: { code: number; title: string; description: string; body: string }[];
};

export type queryInputType = { key: string; example: string | number; type: "string" | "number" | "array-comma" | "array-multi"; option: string[] };

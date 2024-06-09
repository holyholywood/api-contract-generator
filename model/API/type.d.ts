import { HTTPMethodOptioType } from "@/resources/options";

export type apiContract = {
  uuid?: readonly string;
  baseURL: string;
  endpoint: string;
  method: HTTPMethodOptioType;
  params?: { name: string; type: "string" | "integer" }[];
  query?: { key: string; example: string; type: "string" | "integer" | "array-comma" | "array-multi"; option: string[] }[];
  responses: { code: number; title: string; description: string; body: string }[];
};

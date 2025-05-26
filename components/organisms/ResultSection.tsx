import { HTTPMethodOptioType } from "@/resources/options";
import { Chip, Code, Divider, Snippet, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Fragment, memo } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import TextEditor from "../molecules/TextEditor";

interface props {
  label?: string;
  withBorder?: boolean;

  title: string;
  baseURL: string;
  endpoint: string;
  method: HTTPMethodOptioType;
  reqBody: {
    reqBody: string;
    description: string;
  };
  params: Array<{
    name: string;
    type: "string" | "number";
    description: string;
  }>;
  query: Array<{
    key: string;
    example: string | number;
    type: "string" | "number" | "array-comma" | "array-multi";
    option: string[];
  }>;
  responses: Array<{
    code: number;
    title: string;
    description: string;
    body: string;
  }>;
}
const ResultSection = memo(({ title, baseURL, reqBody, endpoint, method, params, query, responses, withBorder = true, label = "Result" }: props) => {
  const fullURl = baseURL + endpoint;
  return (
    <div className="min-h-screen max-w-5xl mx-auto space-y-8 pb-40">
      <div className={` rounded-sm border-default-500 min-h-screen max-w-5xl mx-auto py-8 space-y-6`}>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button className="text-xs font-light">{baseURL ? fullURl : ""}</button>
        </div>
        <Divider className="!my-10 bg-foreground" />
        <div className="flex items-center gap-4">
          <Chip as="div" radius="sm" size="lg" className="text-foreground !font-semibold min-w-[6rem] text-center" color={getMethodColor(method)}>
            {method}
          </Chip>
          <Snippet size="sm" radius="sm" symbol="" className="min-w-[20rem]">
            {endpoint}
          </Snippet>
        </div>
        {params.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm font-medium text-default-400">URL Parameter : </div>
            <Table aria-label="Params">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Description</TableColumn>
              </TableHeader>
              <TableBody>
                {params.map((param, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Code className="text-sm" size="sm" radius="sm">
                        {param.name}
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Chip className="font-light tracking-wide text-xs" size="sm">
                        {param.type}{" "}
                      </Chip>
                    </TableCell>
                    <TableCell className="text-xs">{param.description ? param.description : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {query.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm font-medium text-default-400">URL Query : </div>
            <Table aria-label="Params">
              <TableHeader>
                <TableColumn>Key</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Example</TableColumn>
                <TableColumn>Option</TableColumn>
              </TableHeader>
              <TableBody>
                {query.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Snippet symbol="" size="sm" radius="sm">
                        {item.key}
                      </Snippet>
                    </TableCell>
                    <TableCell>
                      <Chip className="font-light tracking-wide text-xs" size="sm">
                        {item.type}
                      </Chip>
                    </TableCell>
                    <TableCell className="text-xs">
                      {item.key}={item.example}
                    </TableCell>
                    <TableCell className="text-xs max-w-[10rem] font-mono">{item.option.length > 0 ? item.option.join("  |  ") : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {Boolean(reqBody.reqBody) && (
          <>
            <div className="space-y-4">
              <div className="text-sm font-medium text-default-400">Request Body</div>
              <TextEditor isRequired={false} withBeautify={false} body={reqBody.reqBody} readOnly minHeight={10} />
              {reqBody.description && <p className="text-sm font-light bg-default-100 rounded-md px-2 py-3">{reqBody.description}</p>}
            </div>
          </>
        )}
        <Divider />
        <div className="space-y-4">
          <div className="text-sm font-medium text-default-400">Responses : </div>
          {responses.map((response, index) => (
            <Fragment key={index}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{response.title ? response.title : "Response Success"}</h3>
                <Chip
                  radius="sm"
                  className="text-foreground"
                  size="lg"
                  color={response.code < 400 ? "success" : response.code < 500 ? "warning" : "danger"}
                >
                  {response.code}
                </Chip>
              </div>
              {response.description && <p className="text-sm font-light bg-default-100 rounded-md px-2 py-3">{response.description}</p>}
              <TextEditor
                isRequired={false}
                body={response.body}
                readOnly
                withBeautify={false}
                rightAction={
                  <button
                    onClick={() => navigator.clipboard.writeText(response.body)}
                    className="flex items-center gap-1 hover:bg-default-400 duration-500 px-3 py-1 rounded-md text-sm text-default-500"
                  >
                    Copy <RiFileCopyLine />
                  </button>
                }
                label={
                  <div className="inline-flex items-center justify-between">
                    <div className="font-medium text-lg">Body</div>
                  </div>
                }
              />
              {responses.length > 1 && index < responses.length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
});

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

import APIContractService from "@/lib/services/api-contract-service";
import { apiContract } from "@/model/API/type";
import { GetServerSideProps } from "next";
import FloatingAction from "@/components/organisms/FloatingAction";
import MultiQueryInput from "@/components/organisms/MultiQueryInput";
import ParamsSection from "@/components/organisms/ParamsSection";
import RequestBodySection from "@/components/organisms/RequestBodySection";
import ResponseSection from "@/components/organisms/ResponseSection";
import ResultSection from "@/components/organisms/ResultSection";
import Layout from "@/components/templates/Layout";
import useCreateApiContract from "@/model/API/useCreateApiContract";
import { HTTPMethodOptioType, HTTPMethodOption } from "@/resources/options";
import { Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { RiCloseLine } from "react-icons/ri";
import useEditApiContract from "@/model/API/useEditApiContract";

interface pageProps {
  id: string;
  data: apiContract;
}

export const getServerSideProps: GetServerSideProps<pageProps> = async ({ req, res, query, params }) => {
  const id = params ? params.id : null;
  if (!id) {
    return {
      notFound: true,
    };
  }
  const data = await APIContractService.findByID(String(id));
  if (!data) {
    return { notFound: true };
  }
  return {
    props: {
      id: String(id),
      data: JSON.parse(JSON.stringify(data)) as unknown as apiContract,
    },
  };
};

const EditAPIContractPage = ({ id, data }: pageProps) => {
  const { STATE, HANDLER, UI } = useEditApiContract(id, data);
  return (
    <Layout>
      <FloatingAction isLoading={UI.isLoading} onSave={HANDLER.handleSubmit} />
      <div className="max-w-5xl mx-auto space-y-4 pb-40">
        <section className="space-y-10">
          {UI.isError && (
            <div className="py-2 px-4 bg-danger-foreground dark:bg-danger-800 text-danger-400 rounded-md border border-danger-500 font-medium flex items-center justify-between">
              <span>Form Invalid</span>
              <button onClick={() => UI.setIsError(false)}>
                <RiCloseLine />
              </button>
            </div>
          )}
          <Input
            value={STATE.title}
            onChange={(val) => STATE.setTitle(val.target.value)}
            label="Title"
            isRequired
            labelPlacement="outside"
            placeholder="e.g: Get User By ID"
            className="max-w-2xl"
            variant="faded"
          />
          <Select<HTTPMethodOptioType[]>
            label="Method"
            isRequired
            labelPlacement="outside"
            className="max-w-[8rem]"
            variant="faded"
            defaultSelectedKeys={["GET"]}
            selectedKeys={[STATE.method]}
            onSelectionChange={(val) => {
              const data = Array.from(val);
              STATE.setMethod(data[0] as HTTPMethodOptioType);
            }}
          >
            {HTTPMethodOption.map((el) => (
              <SelectItem key={el}>{el}</SelectItem>
            ))}
          </Select>
          <Input
            value={STATE.baseURL}
            onChange={(val) => STATE.setBaseURL(val.target.value)}
            label="Base URL (Optional)"
            labelPlacement="outside"
            placeholder="e.g: https://yourdomain.com"
            className="max-w-2xl"
            variant="faded"
          />
          <Input
            value={STATE.endpoint}
            onChange={(val) => STATE.setEndPoint(val.target.value)}
            label={<div className="inline-flex items-center gap-2">Endpoint (URL)</div>}
            labelPlacement="outside"
            isRequired
            placeholder="e.g: /api/your-endpoint, /api/your-endpoint/:id"
            className="max-w-2xl"
            description="You can add '/:segment' as segment parameter such as /users/:id"
            variant="faded"
          />
          <ParamsSection params={STATE.params} setParams={STATE.setParams} />
          <div className="space-y-6">
            <div className="text-sm">Request Query</div>
            <MultiQueryInput queries={STATE.query} handler={HANDLER.query} />
          </div>
          <RequestBodySection reqBody={STATE.reqBody} handler={STATE.setReqBody} />

          <Divider className="bg-foreground !my-10" />
          <ResponseSection responses={STATE.responses} setResponses={STATE.setResponses} />
        </section>
      </div>
    </Layout>
  );
};

export default EditAPIContractPage;

import ThemeSwitcher from "@/components/molecules/ThemeSwitcher";
import FloatingAction from "@/components/organisms/FloatingAction";
import MultiQueryInput from "@/components/organisms/MultiQueryInput";
import ParamsSection from "@/components/organisms/ParamsSection";
import ResponseSection from "@/components/organisms/ResponseSection";
import ResultSection from "@/components/organisms/ResultSection";
import useCreateApiContract from "@/model/API/useCreateApiContract";
import { HTTPMethodOptioType, HTTPMethodOption } from "@/resources/options";
import { Divider, Input, Select, SelectItem } from "@nextui-org/react";

const Home = () => {
  const { STATE, HANDLER } = useCreateApiContract();
  return (
    <>
      <FloatingAction onSave={HANDLER.handleSubmit} />
      <div className="max-w-5xl mx-auto space-y-4 pb-40">
        <header className="py-8 flex items-center justify-between gap-8">
          <h1 className="font-medium text-xl">API Contract Generators</h1>
          <ThemeSwitcher />
        </header>
        <section className="space-y-10">
          <Input
            value={STATE.title}
            onChange={(val) => STATE.setTitle(val.target.value)}
            label="Title"
            labelPlacement="outside"
            placeholder="e.g: Get User By ID"
            className="max-w-2xl"
            variant="faded"
          />
          <Select<HTTPMethodOptioType[]>
            label="Method"
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
            label={<div className="flex items-center gap-2">Endpoint (URL)</div>}
            labelPlacement="outside"
            placeholder="e.g: /api/your-endpoint, /api/your-endpoint/:id"
            className="max-w-2xl"
            description="You can add '/:segment' as segment parameter such as /users/:id"
            variant="faded"
          />
          <ParamsSection params={STATE.params} setParams={STATE.setParams} />
          <div className="space-y-6">
            <div className="text-sm">Request Query</div>
            <MultiQueryInput />
          </div>
          <ResponseSection responses={STATE.responses} setResponses={STATE.setResponses} />
        </section>
      </div>
      <Divider className="bg-primary-500 !my-20" />
      <ResultSection
        title={STATE.title}
        baseURL={STATE.baseURL}
        endpoint={STATE.endpoint}
        method={STATE.method}
        params={STATE.params}
        query={STATE.query}
        responses={STATE.responses}
      />
    </>
  );
};

export default Home;

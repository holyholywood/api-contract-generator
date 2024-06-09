import TextEditor from "@/components/molecules/TextEditor";
import useCreateApiContract from "@/model/API/useCreateApiContract";
import { HTTPMethodOptioType, HTTPMethodOption } from "@/resources/options";
import { Button, Chip, Divider, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

const Home = () => {
  const { STATE, HANDLER } = useCreateApiContract();
  return (
    <>
      <FloatingAction />
      <div className="max-w-5xl mx-auto space-y-4 pb-40">
        <header className="py-8">
          <h1 className="font-medium text-xl">API Contract Generators</h1>
        </header>
        <section className="space-y-10">
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
            label="Base URL"
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
          {STATE.params.length > 0 && (
            <>
              {STATE.params.map((param, index) => (
                <Fragment key={index}>
                  <div className="space-y-2">
                    <div className="flex gap-4">
                      <Input
                        value={param.name}
                        label="Params"
                        labelPlacement="outside"
                        placeholder="e.g: id, user_id, uuid"
                        className="max-w-2xl"
                        variant="underlined"
                        readOnly
                      />
                      <Select
                        label="Params Type"
                        labelPlacement="outside"
                        className="max-w-[8rem]"
                        defaultSelectedKeys={["string"]}
                        selectedKeys={[param.type]}
                        variant="faded"
                        onSelectionChange={(val) => {
                          const type = Array.from(val);
                          STATE.setParams(index, type[0] as "string" | "integer");
                        }}
                      >
                        {["string", "integer"].map((el) => (
                          <SelectItem key={el}>{el}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </Fragment>
              ))}
            </>
          )}
          <div className="space-y-6">
            <div className="text-sm">Request Query</div>
            <MultiInput />
          </div>
          <ResponseBodyInput />
        </section>
      </div>
    </>
  );
};

export default Home;

const FloatingAction = () => {
  return (
    <div className="bg-default-200 fixed bottom-10 inset-x-0 mx-auto w-full max-w-5xl py-6 px-4 z-50 rounded-lg">
      <div className="flex items-center gap-4 justify-between">
        <div className="w-full bg-success-700 text-success-300 border border-success-400 rounded-md px-2 py-3">
          Fill mandatory field as you need before save!
        </div>
        <Button color="secondary">Export</Button>
        <Button color="primary">Save</Button>
      </div>
    </div>
  );
};

const ResponseBodyInput = () => {
  return (
    <div className="space-y-8">
      <h2 className="font-medium">Response</h2>
      <Divider className="!mb-10"></Divider>
      <div className="flex justify-between items-end pb-8">
        <Input
          className="max-w-[8rem]"
          label="HTTP Code"
          placeholder="eg: 200, 404"
          type="number"
          min={100}
          max={599}
          value="200"
          labelPlacement="outside"
        />
        <Button color="danger">
          <RiDeleteBinLine />
          Remove
        </Button>
      </div>
      <Input variant="faded" className="max-w-2xl" label="Title" placeholder="e.g: Expected Condition" labelPlacement="outside" />
      <Textarea variant="faded" label="Description" labelPlacement="outside" />
      <TextEditor label="Body" />
      <Button startContent={<RiAddLine />} className="mx-auto flex" color="primary">
        Add Response
      </Button>
    </div>
  );
};

const MultiInput = () => {
  const [count, setCount] = useState<number>(1);
  const [queryCount, setQueryCount] = useState<number[]>([1]);
  return (
    <div className="space-y-8">
      {queryCount.map((item, index) => (
        <div className="flex w-full gap-8" key={item}>
          <div className="w-full">
            <QueryInput />
          </div>
          <div className="flex items-center justify-center h-full mt-6">
            <Button
              disabled={queryCount.length < 2}
              isDisabled={queryCount.length < 2}
              onPress={() => {
                setQueryCount([...queryCount.filter((el) => el !== item)]);
                setCount(count - 1);
              }}
              color="danger"
              className=""
            >
              <RiDeleteBinLine />
              Delete
            </Button>
          </div>
        </div>
      ))}
      <Button
        onPress={() => {
          const now = count + 1;
          setCount(now);
          setQueryCount([...Array.from(Array(now), (_, i) => i + 1)]);
        }}
        startContent={<RiAddLine />}
        className="mx-auto flex"
        color="primary"
      >
        Add Request Query
      </Button>
    </div>
  );
};

const QueryInput = () => {
  const [option, setOption] = useState<string[]>([]);
  const [optionName, setOptionName] = useState<string>("");
  function onOptionChange() {
    if (!option.includes(optionName)) {
      setOption([...option, optionName]);
    }
    setOptionName("");
  }
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          label="Key"
          labelPlacement="outside"
          placeholder="e.g: created_at, name, sort_by, sort_method"
          className="max-w-sm"
          variant="faded"
          readOnly
        />
        <Input
          label="Example"
          labelPlacement="outside"
          placeholder="e.g: 1, John Doe, apple, guava, orange"
          className="max-w-sm"
          variant="faded"
          readOnly
        />
        <Select variant="faded" label="Query Type" labelPlacement="outside" className="max-w-xs" defaultSelectedKeys={["String"]}>
          {["String", "Integer", "Array(Comma Separated)", "Array(Multi Key)"].map((el) => (
            <SelectItem key={el}>{el}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="space-y-2">
        <div className="flex">
          <Input
            label="Available Option (Optional)"
            labelPlacement="outside-left"
            size="sm"
            placeholder="e.g: SUCCESS, FAILED"
            className="max-w-sm"
            variant="underlined"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
          />
          <Button onPress={onOptionChange} size="sm" color="secondary">
            <RiAddLine />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {option.map((el, index) => (
            <Chip
              key={index}
              color="secondary"
              isCloseable
              onClose={() => {
                setOption([...option.filter((opt) => opt !== el)]);
              }}
            >
              {el}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

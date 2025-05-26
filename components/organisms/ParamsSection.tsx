import { Divider, Input, Select, SelectItem } from "@nextui-org/react";
import React, { Fragment, memo } from "react";
interface paramsSectionProps {
  params: {
    name: string;
    type: "string" | "number";
    description: string;
  }[];

  setParams: (index: number, data: { type: "string" | "number"; description: string }) => void;
}

const ParamsSection = memo(({ params, setParams }: paramsSectionProps) => {
  return (
    <>
      {params.length > 0 && (
        <div className="space-y-6">
          <div>URL Params</div>
          {params.map((param, index) => (
            <Fragment key={index}>
              <div className="space-y-2">
                <div className="flex gap-4">
                  <Input
                    value={param.name}
                    label="Params Key"
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
                      setParams(index, { ...param, type: type[0] as "string" | "number" });
                    }}
                  >
                    {["string", "number"].map((el) => (
                      <SelectItem key={el}>{el}</SelectItem>
                    ))}
                  </Select>{" "}
                  <Input
                    value={param.description}
                    onChange={({ target }) => setParams(index, { ...param, description: target.value })}
                    label="Params Decription"
                    labelPlacement="outside"
                    placeholder="e.g: get from logged in state"
                    className="max-w-2xl"
                    variant="faded"
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
});

export default ParamsSection;

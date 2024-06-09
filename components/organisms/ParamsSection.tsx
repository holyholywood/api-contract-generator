import { Divider, Input, Select, SelectItem } from "@nextui-org/react";
import React, { Fragment } from "react";
interface paramsSectionProps {
  params: {
    name: string;
    type: "string" | "integer";
  }[];

  setParams: (index: number, type: "string" | "integer") => void;
}

const ParamsSection = ({ params, setParams }: paramsSectionProps) => {
  return (
    <div className="space-y-6">
      <div>URL Params</div>
      <Divider className="bg-white !my-8" />
      {params.length > 0 && (
        <>
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
                      setParams(index, type[0] as "string" | "integer");
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
    </div>
  );
};

export default ParamsSection;

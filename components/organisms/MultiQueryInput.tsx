import { queryInputType } from "@/model/API/type";
import { Button, Chip, Input, Select, SelectItem } from "@nextui-org/react";
import React, { memo, useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

interface multiQueryInputProps {
  queries: Array<queryInputType>;
  handler: {
    onQueryChange: (index: number, data: queryInputType) => void;
    onQueryOptionChange: (index: number, options: string[]) => void;
    onAddQuery: () => void;
    onRemoveQuery: (index: number) => void;
  };
}
const MultiQueryInput = memo(({ queries, handler }: multiQueryInputProps) => {
  return (
    <div className="space-y-8 max-w-5xl">
      {queries.map((item, index) => (
        <div className="flex w-full gap-8" key={index}>
          <div className="w-full">
            <QueryInput data={item} index={index} onQueryChange={handler.onQueryChange} onQueryOptionChange={handler.onQueryOptionChange} />
          </div>
          <div className="flex items-center justify-center h-full mt-6">
            <Button
              disabled={queries.length < 1}
              isDisabled={queries.length < 1}
              onPress={() => {
                handler.onRemoveQuery(index);
              }}
              color="danger"
              className=""
            >
              <RiDeleteBinLine />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button
        size="sm"
        onPress={handler.onAddQuery}
        startContent={<RiAddLine />}
        className={`${queries.length > 0 ? "mx-auto" : ""} flex`}
        color="primary"
        variant="bordered"
      >
        Add Request Query
      </Button>
    </div>
  );
});

export default MultiQueryInput;

interface queryInputProps {
  index: number;
  data: queryInputType;
  onQueryChange: (index: number, data: queryInputType) => void;
  onQueryOptionChange: (index: number, options: string[]) => void;
}
const QueryInput = memo(({ index, data, onQueryChange, onQueryOptionChange }: queryInputProps) => {
  const [option, setOption] = useState<string[]>([]);
  const [optionName, setOptionName] = useState<string>("");
  function onOptionChange() {
    if (!option.includes(optionName) && Boolean(optionName)) {
      const res = [...option, optionName];
      setOption(res);
      onQueryOptionChange(index, res);
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
          value={data.key}
          onChange={({ target }) => onQueryChange(index, { ...data, key: target.value })}
        />
        <Input
          label="Example"
          labelPlacement="outside"
          placeholder="e.g: 1, John Doe, apple, guava, orange"
          className="max-w-sm"
          variant="faded"
          value={String(data.example)}
          onChange={({ target }) => onQueryChange(index, { ...data, example: target.value })}
        />
        <Select
          variant="faded"
          label="Query Type"
          labelPlacement="outside"
          className="max-w-xs"
          defaultSelectedKeys={["string"]}
          onSelectionChange={(val) => {
            const res = Array.from(val)[0] as queryInputType["type"];

            onQueryChange(index, { ...data, type: res });
          }}
        >
          {staticData.map((el) => (
            <SelectItem key={el.key}>{el.label}</SelectItem>
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
          <Button disabled={!Boolean(optionName)} isDisabled={!Boolean(optionName)} onPress={onOptionChange} size="sm" color="default">
            <RiAddLine />
          </Button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {option.map((el, index) => (
            <Chip
              key={index}
              color="secondary"
              isCloseable
              onClose={() => {
                const res = [...option.filter((opt) => opt !== el)];
                setOption(res);
                onQueryOptionChange(index, res);
              }}
            >
              {el}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
});

const staticData = [
  {
    label: "String",
    key: "string",
  },
  {
    label: "Number",
    key: "number",
  },
  {
    label: "Array(Comma Separated)",
    key: "array-comma",
  },
  {
    label: "Array(Multi Key)",
    key: "array-multi",
  },
];

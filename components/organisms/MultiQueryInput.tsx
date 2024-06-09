import { Button, Chip, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

const MultiQueryInput = () => {
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
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button
        size="sm"
        onPress={() => {
          const now = count + 1;
          setCount(now);
          setQueryCount([...Array.from(Array(now), (_, i) => i + 1)]);
        }}
        startContent={<RiAddLine />}
        className="mx-auto flex"
        color="primary"
        variant="bordered"
      >
        Add Request Query
      </Button>
    </div>
  );
};

export default MultiQueryInput;

const QueryInput = () => {
  const [option, setOption] = useState<string[]>([]);
  const [optionName, setOptionName] = useState<string>("");
  function onOptionChange() {
    if (!option.includes(optionName) && Boolean(optionName)) {
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
          <Button disabled={!Boolean(optionName)} isDisabled={!Boolean(optionName)} onPress={onOptionChange} size="sm" color="default">
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

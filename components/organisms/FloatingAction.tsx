import { Button } from "@nextui-org/react";
import React from "react";
interface floatingACtionProps {
  // onExport:() => void
  onSave: () => void;
  isLoading?: boolean;
}
const FloatingAction = ({ onSave, isLoading }: floatingACtionProps) => {
  return (
    <div className="bg-default-200 fixed bottom-10 inset-x-0 mx-auto w-full max-w-5xl py-6 px-4 z-50 rounded-lg">
      <div className="flex items-center gap-4 justify-between">
        <div className="w-full bg-default-700 text-default-300 border border-default-400 rounded-md px-2 py-3">
          {isLoading ? "Submitting" : "Fill mandatory field as you need before save!"}
        </div>
        <Button isLoading={isLoading} color="primary" variant="flat">
          Export
        </Button>
        <Button isLoading={isLoading} onPress={onSave} color="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default FloatingAction;

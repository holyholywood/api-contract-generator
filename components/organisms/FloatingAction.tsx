import { Button } from "@nextui-org/react";
import React from "react";
interface floatingACtionProps {
  // onExport:() => void
  onSave: () => void;
}
const FloatingAction = ({ onSave }: floatingACtionProps) => {
  return (
    <div className="bg-default-200 fixed bottom-10 inset-x-0 mx-auto w-full max-w-5xl py-6 px-4 z-50 rounded-lg">
      <div className="flex items-center gap-4 justify-between">
        <div className="w-full bg-success-700 text-success-300 border border-success-400 rounded-md px-2 py-3">
          Fill mandatory field as you need before save!
        </div>
        <Button color="primary" variant="flat">
          Export
        </Button>
        <Button onPress={onSave} color="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default FloatingAction;

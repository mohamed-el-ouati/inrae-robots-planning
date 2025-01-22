"use client";

import React from "react";
import RobotFormStep from "./RobotStep";
import EquipmentStep from "./EquipmentStep";

interface RobotAndEquipmentStepProps {
  form: any;
  robotUrl: string;
  equipmentUrl: string;
}

const RobotAndEquipmentStep: React.FC<RobotAndEquipmentStepProps> = ({
  form,
  robotUrl,
  equipmentUrl,
}) => {
  const robot = form.watch("robot"); // Watch for changes to the 'robot' field

  return (
    <div className="flex flex-col gap-4">
      <RobotFormStep form={form} url={robotUrl} />
      {robot && <EquipmentStep form={form} url={equipmentUrl} />}
    </div>
  );
};

export default RobotAndEquipmentStep;

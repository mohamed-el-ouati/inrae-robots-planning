import React from "react";
import { Stepper } from "react-form-stepper";

type FormStepperProps = {
  steps: any;
  activeStep: number;
};

const FormStepper = ({ steps, activeStep }: FormStepperProps) => {
  return (
    <div className="hidden lg:block">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        styleConfig={{
          completedBgColor: "#64748b",
          completedTextColor: "#ffffff",
          activeBgColor: "#0f172a",
          activeTextColor: "#fffff",
          disabledBgColor: "#f1f5f9",
          disabledTextColor: "#ffffff",
          inactiveBgColor: "#e0e0e0",
          inactiveTextColor: "#ffffff",
          size: "2em",
          circleFontSize: "1rem",
          labelFontSize: "0.875rem",
          borderRadius: 50,
          fontWeight: 500,
        }}
      />
    </div>
  );
};

export default FormStepper;

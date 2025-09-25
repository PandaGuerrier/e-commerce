"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "#ui/components/button";
import { cn } from "#ui/lib/utils";

interface StepProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

const Step: React.FC<StepProps> = ({
  title,
  description,
  isCompleted,
  isActive,
}) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
                ? "border-primary"
                : "border-muted",
          )}
        >
          {isCompleted ? (
            <Check className="w-4 h-4" />
          ) : (
            <span className="text-sm font-medium">{title[0]}</span>
          )}
        </div>
      </div>
      <div className="ml-4">
        <p
          className={cn(
            "text-sm font-medium",
            isActive || isCompleted
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

interface StepperProps {
  steps: Array<{ title: string; description?: string; buttons?: boolean }>;
  currentStep: number;
  onStepChange: (step: number) => void;
  children?: React.ReactNode;
  finishHandler?: () => void;
}

export function Stepper({
  steps,
  currentStep,
  onStepChange,
  children,
  finishHandler,
}: StepperProps) {
  const childrenArray = React.Children.toArray(children);

  const handleNext = () => {
    if (currentStep === steps.length - 1 && finishHandler) {
      finishHandler();
    } else {
      onStepChange(currentStep + 1);
    }
  };


  return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <Step
                    title={step.title}
                    description={step.description}
                    isCompleted={index < currentStep}
                    isActive={index === currentStep}
                />
                {index < steps.length - 1 && (
                    <ChevronRight className="hidden md:block text-muted-foreground"/>
                )}
              </React.Fragment>
          ))}
        </div>

        <div className="mt-8 border rounded-md p-6">
          {childrenArray[currentStep] || (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Contenu de l'étape {currentStep + 1}
                </h2>
                <p>{steps[currentStep]!.description}</p>
              </div>
          )}
        </div>

        <div className="w-full flex justify-end mt-4">
          {steps[currentStep]?.buttons && (
              <div className="flex w-full">
                <Button
                    variant="outline"
                    onClick={() => onStepChange(currentStep - 1)}
                    disabled={currentStep === 0}
                    className="mr-auto"
                >
                  Précédent
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1 && !finishHandler}
                    className="ml-auto"
                >
                  {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
                </Button>
              </div>
          )}
        </div>
      </div>
  );
}

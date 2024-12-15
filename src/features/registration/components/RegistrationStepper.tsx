import { Check } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function RegistrationStepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="relative flex justify-between">
      {steps.map((step, index) => (
        <div key={step.title} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              index <= currentStep
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-muted-foreground'
            }`}
          >
            {index < currentStep ? (
              <Check className="h-4 w-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm font-medium">{step.title}</p>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
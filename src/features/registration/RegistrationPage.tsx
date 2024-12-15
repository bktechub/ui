import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/lib/hooks';
import { registerNGO } from '@/features/auth/authSlice';
import { RegistrationStepper } from './components/RegistrationStepper';
import { BasicInfoForm } from './components/BasicInfoForm';
import { ContactDetailsForm } from './components/ContactDetailsForm';
import { DocumentUploadForm } from './components/DocumentUploadForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/routes';

const STEPS = [
  {
    title: 'Basic Information',
    description: 'Organization details',
  },
  {
    title: 'Contact Details',
    description: 'Contact information',
  },
  {
    title: 'Documents',
    description: 'Upload required documents',
  },
];

export function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBasicInfoSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(1);
  };

  const handleContactDetailsSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleDocumentUploadSubmit = async (data: any) => {
    const finalData = { ...formData, ...data };
    try {
      await dispatch(registerNGO(finalData)).unwrap();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>NGO Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <RegistrationStepper steps={STEPS} currentStep={currentStep} />

          {currentStep === 0 && (
            <BasicInfoForm
              onSubmit={handleBasicInfoSubmit}
              defaultValues={formData}
            />
          )}

          {currentStep === 1 && (
            <ContactDetailsForm
              onSubmit={handleContactDetailsSubmit}
              onBack={() => setCurrentStep(0)}
              defaultValues={formData}
            />
          )}

          {currentStep === 2 && (
            <DocumentUploadForm
              onSubmit={handleDocumentUploadSubmit}
              onBack={() => setCurrentStep(1)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
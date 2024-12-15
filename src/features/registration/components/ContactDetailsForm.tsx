import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const contactDetailsSchema = z.object({
  contactPerson: z.string().min(2, 'Contact person name is required'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(10, 'Invalid phone number'),
});

type ContactDetailsData = z.infer<typeof contactDetailsSchema>;

interface ContactDetailsFormProps {
  onSubmit: (data: ContactDetailsData) => void;
  onBack: () => void;
  defaultValues?: Partial<ContactDetailsData>;
}

export function ContactDetailsForm({
  onSubmit,
  onBack,
  defaultValues,
}: ContactDetailsFormProps) {
  const form = useForm<ContactDetailsData>({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: {
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
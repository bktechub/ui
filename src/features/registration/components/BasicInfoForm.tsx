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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const basicInfoSchema = z.object({
  organizationName: z.string().min(2, 'Organization name is required'),
  physicalAddress: z.string().min(2, 'Physical address is required'),
  operationalAddress: z.string().min(2, 'Operational address is required'),
  domains: z.array(z.string()).min(1, 'Select at least one domain'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type BasicInfoData = z.infer<typeof basicInfoSchema>;

interface BasicInfoFormProps {
  onSubmit: (data: BasicInfoData) => void;
  defaultValues?: Partial<BasicInfoData>;
}

const DOMAINS = [
  'Community Healing',
  'Social Reintegration',
  'Social Cohesion',
] as const;

export function BasicInfoForm({ onSubmit, defaultValues }: BasicInfoFormProps) {
  const form = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      organizationName: '',
      physicalAddress: '',
      operationalAddress: '',
      domains: [],
      description: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="physicalAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="operationalAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operational Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="domains"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domains of Intervention</FormLabel>
              <Select
                onValueChange={(value) => field.onChange([...field.value, value])}
                value={field.value[0]}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domains" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DOMAINS.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  );
}
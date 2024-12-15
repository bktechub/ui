import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];

const documentUploadSchema = z.object({
  legalRegistration: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Legal registration document is required')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'Max file size is 5MB'
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      'File type not accepted'
    ),
  supportingDocuments: z
    .custom<FileList>()
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      'Max file size is 5MB'
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_FILE_TYPES.includes(file.type)
        ),
      'File type not accepted'
    ),
});

type DocumentUploadData = z.infer<typeof documentUploadSchema>;

interface DocumentUploadFormProps {
  onSubmit: (data: DocumentUploadData) => void;
  onBack: () => void;
}

export function DocumentUploadForm({ onSubmit, onBack }: DocumentUploadFormProps) {
  const form = useForm<DocumentUploadData>({
    resolver: zodResolver(documentUploadSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="legalRegistration"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Legal Registration Document</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept={ACCEPTED_FILE_TYPES.join(',')}
                    onChange={(e) => onChange(e.target.files)}
                    {...field}
                  />
                  <Upload className="h-4 w-4" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supportingDocuments"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Supporting Documents</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept={ACCEPTED_FILE_TYPES.join(',')}
                    multiple
                    onChange={(e) => onChange(e.target.files)}
                    {...field}
                  />
                  <Upload className="h-4 w-4" />
                </div>
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
            Submit Registration
          </Button>
        </div>
      </form>
    </Form>
  );
}
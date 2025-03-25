import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JsonEditor } from './JsonEditor';
import { TSystemConfig } from '@/utils/types/system-config.type';
import {
  getConfigValueType,
  createConfigWithValue,
  getConfigValue,
} from '@/app/(secure)/admin/system-config-manage/_helpers/config.helper';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  valueType: z.enum(['string', 'number', 'boolean', 'json']),
  value: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

interface ConfigFormProps {
  initialData?: TSystemConfig;
  onSubmit: (data: TSystemConfig) => void;
  isLoading?: boolean;
}

export const ConfigForm = ({ initialData, onSubmit, isLoading = false }: ConfigFormProps) => {
  // Determine initial value type and value
  const initialValueType = initialData ? getConfigValueType(initialData) || 'string' : 'string';
  const initialValue = initialData ? getConfigValue(initialData) : '';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: initialData?.key || '',
      valueType: initialValueType as 'string' | 'number' | 'boolean' | 'json',
      value: initialValue,
    },
  });

  const valueType = form.watch('valueType');

  const handleSubmit = (data: FormValues) => {
    const config = createConfigWithValue(data.key, data.value, data.valueType);
    onSubmit(config);
  };

  const renderValueInput = () => {
    const value = form.watch('value');

    switch (valueType) {
      case 'string':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => form.setValue('value', e.target.value)}
            disabled={isLoading}
            className="w-full"
            rows={4}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => form.setValue('value', e.target.value ? parseFloat(e.target.value) : null)}
            disabled={isLoading}
            className="w-full"
          />
        );
      case 'boolean':
        return (
          <Checkbox
            checked={!!value}
            onCheckedChange={(checked) => form.setValue('value', !!checked)}
            disabled={isLoading}
          />
        );
      case 'json':
        return (
          <JsonEditor
            value={typeof value === 'string' ? value : JSON.stringify(value || {})}
            onChange={(jsonValue) => {
              try {
                // Try to parse as JSON to validate
                const parsedJson = JSON.parse(jsonValue);
                form.setValue('value', parsedJson);
              } catch (e) {
                // Store as string if invalid JSON
                form.setValue('value', jsonValue);
              }
            }}
            readOnly={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!!initialData || isLoading} placeholder="Enter configuration key" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset value when type changes
                        form.setValue('value', null);
                      }}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a value type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>{renderValueInput()}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

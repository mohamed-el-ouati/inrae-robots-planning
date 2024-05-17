"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form as ShadcnForm } from "@/components/ui/form";
import FormFactory from "@/components/form/FormFactory";

type FormProps = {
  formSchema: z.ZodObject<any, any>;
  onSubmit: any;
  formDefinition: any[];
  defaultValues?: any;
};

const Form = ({
  formSchema,
  onSubmit,
  formDefinition,
  defaultValues,
}: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <ShadcnForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >
        {formDefinition.map((field, index) => (
          <FormFactory
            form={form}
            name={field.name}
            label={field.label}
            type={field.type}
            key={index}
            options={field.options}
            placeholder={field.placeholder}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </ShadcnForm>
  );
};

export default Form;

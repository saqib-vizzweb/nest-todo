// export class CreateTodoDto {
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
// }

import { z } from 'zod';

export const createTodoSchema = z
  .object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string(),
    completed: z.boolean().optional(),
  })
  .required();

export type CreateTodoDto = z.infer<typeof createTodoSchema>;

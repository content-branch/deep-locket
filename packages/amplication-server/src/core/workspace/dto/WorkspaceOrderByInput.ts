import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from 'src/enums/SortOrder';

@InputType({
  isAbstract: true,
  description: undefined
})
export class WorkspaceOrderByInput {
  @Field(() => SortOrder, {
    nullable: true,
    description: undefined
  })
  id?: SortOrder | null;

  @Field(() => SortOrder, {
    nullable: true,
    description: undefined
  })
  createdAt?: SortOrder | null;

  @Field(() => SortOrder, {
    nullable: true,
    description: undefined
  })
  updatedAt?: SortOrder | null;

  @Field(() => SortOrder, {
    nullable: true,
    description: undefined
  })
  name?: SortOrder | null;
}

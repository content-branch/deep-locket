import { Field, InputType } from '@nestjs/graphql';
import { WhereUniqueInput, DateTimeFilter, StringFilter } from 'src/dto';

@InputType({
  isAbstract: true,
  description: undefined
})
export class BlockTypeWhereInput {
  @Field(() => StringFilter, {
    nullable: true,
    description: undefined
  })
  id?: StringFilter | null;

  @Field(() => DateTimeFilter, {
    nullable: true,
    description: undefined
  })
  createdAt?: DateTimeFilter | null;

  @Field(() => DateTimeFilter, {
    nullable: true,
    description: undefined
  })
  updatedAt?: DateTimeFilter | null;

  @Field(() => WhereUniqueInput, {
    nullable: true,
    description: undefined
  })
  app?: WhereUniqueInput | null;

  @Field(() => WhereUniqueInput, {
    nullable: true,
    description: undefined
  })
  parentBlock?: WhereUniqueInput | null;

  @Field(() => StringFilter, {
    nullable: true,
    description: undefined
  })
  displayName?: StringFilter | null;

  @Field(() => StringFilter, {
    nullable: true,
    description: undefined
  })
  description?: StringFilter | null;

  // AND?: BlockWhereInput[] | null;

  // OR?: BlockWhereInput[] | null;

  // NOT?: BlockWhereInput[] | null;

  //app?: WhereUniqueInput | null;
}

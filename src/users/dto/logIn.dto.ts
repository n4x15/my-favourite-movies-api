import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogInDto {
  @Field()
  accessToken: string;
}

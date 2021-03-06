import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenresDto {
  @Field()
  id: number;
  
  @Field()
  name: string;
}

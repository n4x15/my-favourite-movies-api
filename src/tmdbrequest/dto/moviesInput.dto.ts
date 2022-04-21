import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MoviesInputDto {
  @Field({ nullable: true })
  language?: string;

  @Field(() => [Number], { nullable: true })
  genresId?: number[];

  @Field({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  page?: number;
}

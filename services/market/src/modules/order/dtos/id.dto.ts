import { IsNumber, Min } from "class-validator";

export class IdDto {
   @IsNumber()
   @Min(1)
   id: number;
}

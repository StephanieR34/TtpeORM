import { IsNotEmpty, IsString, isValidationOptions, MaxLength, MinLength } from "class-validator";

export class AddTodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'la taille minimale est de 6 caractère'
    })
    @MaxLength(25)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;

    
}
// npx tsc -init
import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsString, IsNumber } from "class-validator";

export class User {
    @Expose({name:"nombre"})
    @IsString()
    @IsDefined(
        {
            message:() =>{
                throw {
                    status:422,
                    message: "El parametro -> nombre"
                }
            }
        })
        name:String;

        @Expose({name:"contrasenia"})
        @IsString()
        @IsDefined(
            {
                message:() =>{
                    throw {
                        status:422,
                        message: "El parametro -> contraseña"
                    }
                }
            })
        password:String
        
        @Expose({name:"autenticado"})
        @IsNumber()
        @IsDefined(
            {
                message:() =>{
                    throw {
                        status:422,
                        message: "El parametro -> autenticado"
                    }
                }
            })
        isAuth:number

        constructor(nombre:String, constrasenia:String, autenticado:number){
            this.name = nombre,
            this.password = constrasenia,
            this.isAuth = autenticado 
        }
    }

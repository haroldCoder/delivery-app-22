import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class DeliveryService {
    constructor(@Inject("DATABASE_CONNECTION") private readonly database : Pool){}

    async getAlldeliverers(): Promise<{status: HttpStatus, res: any}>{
        try{
          const [res] = await this.database.query(`SELECT * FROM delivery`);  
          return {status: HttpStatus.OK, res: res}
        }
        catch(err){
            return {status: HttpStatus.INTERNAL_SERVER_ERROR, res: err}
        }
    }

    async createDeliverer(name: string, cel: string, xp: string): Promise<{status: HttpStatus, res: any}>{
        try{
            await this.database.query(`INSERT INTO delivery(name, cel, xp) VALUES("${name}", "${cel}", "${xp}")`)
            return {status: HttpStatus.CREATED, res: "deliverer created"}
        }
        catch(err){
            return {status: HttpStatus.INTERNAL_SERVER_ERROR, res: err}
        }
    }

    async modifyDeliverer(name: string, cel: string, xp: string | undefined, state: boolean | undefined, id: number): Promise<{status: HttpStatus, res: any}>{
        try{
            await this.database.query(`UPDATE delivery SET name = "${name}", cel = ${cel}, xp = "${xp}", state = ${state}  WHERE id = ${id}`)
            return {status: HttpStatus.OK, res: "deliverer modified"};
        }
        catch(err){
            return {status: HttpStatus.INTERNAL_SERVER_ERROR, res: err}
        }
    }

    async deleteDeliverer(id: number): Promise<{status: HttpStatus, res: any}>{
        try{
            await this.database.query(`DELETE FROM delivery WHERE id = ${id}`)
            return {status: HttpStatus.OK, res: "deliverer deleted"}
        }
        catch(err){
            return {status: HttpStatus.INTERNAL_SERVER_ERROR, res: err}
        }
    }
}

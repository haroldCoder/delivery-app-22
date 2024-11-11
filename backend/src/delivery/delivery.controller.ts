import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, Res, Response } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import exp from "express"

@Controller()
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService){}

    @Get("api/delivery")
    @Bind(Request(), Response())
    async getAllDeliverers(req: exp.Request, response: exp.Response){
        const {status, res} = await this.deliveryService.getAlldeliverers();
        response.status(status).json(res);
    }

    @Post("api/delivery")
    @Bind(Body(), Res())
    async createdDeliverer({name, cel, xp}: {name: string, cel: string, xp: string}, resp: exp.Response){
        const {status, res} = await this.deliveryService.createDeliverer(name, cel, xp);
        resp.status(status).json(res);
    }

    @Patch("api/delivery/:id")
    @Bind(Body(), Param('id'), Res())
    async updateDeliverer({name, cel, xp, state}: {name: string, cel: string, xp: string, state: boolean}, id: number, resp: exp.Response){
        const {status, res} = await this.deliveryService.modifyDeliverer(name, cel, xp, state, id);
        resp.status(status).json(res);
    }

    @Delete("/api/delivery/:id")
    @Bind(Param('id'), Res())
    async deleteDeliverer(id: number, resp: exp.Response){
        const {status, res} = await this.deliveryService.deleteDeliverer(id);
        resp.status(status).json(res);
    }
}

import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ProductsService } from '../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    // puedo enviar algo asi http://localhost:3000/products?limit=100&offset=50
    // return {
    //   message: `limit: ${limit} offset: ${offset} brand: ${brand}`,
    // };
    return this.productsService.findAll();
  }

  // aqui colocamos filter arriba para que no se confunda con el de abajo ya que puede pensar que "filter" es un id
  @Get('filter')
  getProductFilter() {
    return `Soy un filtro`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    // tiene que ser params.id porque tiene que ser el mismo nombre que el parametro como lo pongamos
    // return {
    //   message: `productId: ${productId}`,

    // };
    // Al agregarle el + adelante de productId, lo convierte a number
    return this.productsService.findOne(+productId);
  }

  @Post()
  create(@Body() payload: any) {
    // return {
    //   message: 'action create',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  //update
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productsService.update(+id, payload);
  }

  //delete
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

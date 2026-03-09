import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    // Rota: POST http://localhost:3000/order
    return this.ordersService.create(createOrderDto);
  }

  @Get('list') 
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos retornada com sucesso.' })
  findAll() {
    // Rota: GET http://localhost:3000/order/list
    return this.ordersService.findAll();
  }

  @Get(':numeroPedido') 
  @ApiOperation({ summary: 'Obter dados do pedido pelo número' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  findOne(@Param('numeroPedido') numeroPedido: string) {
    // Rota: GET http://localhost:3000/order/:numeroPedido
    return this.ordersService.findOne(numeroPedido);
  }

  @Put(':numeroPedido') 
  @ApiOperation({ summary: 'Atualizar um pedido pelo número' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso.' })
  update(@Param('numeroPedido') numeroPedido: string, @Body() updateOrderDto: UpdateOrderDto) {
    // Rota: PUT http://localhost:3000/order/:numeroPedido
    return this.ordersService.update(numeroPedido, updateOrderDto);
  }

  @Delete(':numeroPedido') 
  @ApiOperation({ summary: 'Deletar um pedido pelo número' })
  @ApiResponse({ status: 200, description: 'Pedido deletado com sucesso.' })
  remove(@Param('numeroPedido') numeroPedido: string) {
    // Rota: DELETE http://localhost:3000/order/:numeroPedido
    return this.ordersService.remove(numeroPedido);
  }
}
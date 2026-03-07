import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    // "de-para" (Português -> Inglês)
    const createdOrder = await this.prisma.order.create({
      data: {
        orderId: createOrderDto.numeroPedido,
        value: createOrderDto.valorTotal,
        creationDate: new Date(createOrderDto.dataCriacao),
        items: {
          create: createOrderDto.items.map((item) => ({
            productId: parseInt(item.idItem, 10),
            quantity: item.quantidadeItem,
            price: item.valorItem,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return createdOrder;
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { items: true },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderId: id },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    // Atualizamos apenas o valor, mapeando do português (valorTotal) para o inglês (value)
    return this.prisma.order.update({
      where: { orderId: id },
      data: {
        // Se não vier valorTotal, ignora.
        ...(updateOrderDto.valorTotal && { value: updateOrderDto.valorTotal }),
      },
      include: { items: true },
    });
  }
  async remove(id: string) {
    // Verifica se existe antes de deletar
    await this.findOne(id);

    return this.prisma.order.delete({
      where: { orderId: id },
    });
  }
}

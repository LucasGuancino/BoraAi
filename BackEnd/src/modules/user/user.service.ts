import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userData: UserDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    if (userData.senha === userData.confirmarSenha) {
      const newUser = await this.prisma.user.create({
        data: {
          nome: userData.nome,
          telefone: userData.telefone,
          email: userData.email,
          senha: userData.senha,
          confirmarSenha: userData.confirmarSenha,
        },
      });

      // Criação do registro na tabela hist_caronas
      const histCarona = await this.prisma.hist_caronas.create({
        data: {
          userId: newUser.id,
          caronasPegas: 0,
          caronasFornecidas: 0,
        },
      });

      return newUser;
    } else {
      throw new Error('Senha incorreta');
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, userData: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    const updateUser = await this.prisma.user.update({
      data: {
        nome: userData.nome,
        telefone: userData.telefone,
        email: userData.email,
        senha: userData.senha,
        confirmarSenha: userData.confirmarSenha,
      },
      where: {
        id,
      },
    });
    if (userData.senha === userData.confirmarSenha) {
      return updateUser;
    } else {
      throw new Error('Senha incorreta');
    }
  }

  async delete(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
/*
const newCarona = await this.prisma.carona.create({
                data: {
                    end_origem: userDto.end_origem,
                    hr_saida: userDto.hr_saida,
                    hr_chegada: userDto.hr_chegada,
                    met_pagamento: userDto.met_pagamento,
                },
            });
 */

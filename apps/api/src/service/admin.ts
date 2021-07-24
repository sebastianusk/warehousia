import { PrismaClient } from ".prisma/client";
import { Inject, Injectable } from "@nestjs/common";

export type AdminInputModel = {
  username: string;
  password: string;
  role: string;
  warehouse: string[];
}

@Injectable()
export class AdminService {
  constructor(@Inject() private prisma: PrismaClient) {}

  async addAdmin(input: AdminInputModel): Promise<string>{
    const data = await this.prisma.admin.create({
      data: input    
    });
    return data.username
  }
}

import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {PrismaService} from 'prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTeamDto, logoFilename?: string) {
    return this.prisma.team.create({
      data: {
        ...dto,
        logoUrl: logoFilename ? `/uploads/teams/${logoFilename}` : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  async findOne(id: string) {
    const team = await this.prisma.team.findUnique({where: {id}});
    if (!team) throw new NotFoundException('Time não encontrado');
    return team;
  }

  async update(id: string, dto: UpdateTeamDto, logoFilename?: string) {
    const team = await this.prisma.team.findUnique({where: {id}});
    if (!team) throw new NotFoundException('Time não encontrado');

    return this.prisma.team.update({
      where: {id},
      data: {
        ...dto,
        logoUrl: logoFilename ? `/uploads/teams/${logoFilename}` : team.logoUrl, // mantém a imagem anterior se nova não for enviada
      },
    });
  }

  async remove(id: string) {
    const team = await this.prisma.team.findUnique({where: {id}});
    if (!team) throw new NotFoundException('Time não encontrado');
    return this.prisma.team.delete({where: {id}});
  }
}

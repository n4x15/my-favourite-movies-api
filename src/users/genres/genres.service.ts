import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { Genres } from './genres.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genres)
    private genresRepository: Repository<Genres>,
    private userService: UserService,
  ) {}

  async getUserGenres(login: string): Promise<Genres[]> {
    const user = await this.userService.getUser(login);
    return await this.genresRepository.find({ where: { user } });
  }

  async addGenres(id: number, login: string): Promise<Genres> {
    const user = await this.userService.getUser(login);
    if (
      !(await this.genresRepository.findOne({ where: { genresId: id, user } }))
    ) {
      return await this.genresRepository.save({
        genresId: id,
        isChecked: true,
        user,
      });
    }
  }

  async removeGenres(id: number, login: string): Promise<Genres> {
    const user = await this.userService.getUser(login);
    const genre = await this.genresRepository.findOne({
      where: { genresId: id, user },
    });
    await this.genresRepository.remove(genre);
    return genre;
  }
}

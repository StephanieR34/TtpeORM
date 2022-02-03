import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ){

    }

    async getCvs(): Promise<CvEntity[]> {
        return await this.cvRepository.find();
    }

    async addCv(cv: AddCvDto): Promise<CvEntity> {
        return await this.cvRepository.save(cv);
    }

    async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
        const newCv = await this.cvRepository.preload({
            id,
            ...cv
        });
        if(! newCv) {
            throw new NotFoundException(`le cv d'id ${id} n'existe pas`)
        }
        return await this.cvRepository.save(newCv);
    }

    updateCv2(updateCriteria, cv: UpdateCvDto) {
        return this.cvRepository.update(updateCriteria, cv)
    }
}

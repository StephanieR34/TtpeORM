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
    async findCvById(id: number){
        const cv = await this.cvRepository.findOne(id);
        if(! cv) {
            throw new NotFoundException(`le cv d'id ${id} n'existe pas`)
        }
        return cv;
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

    async removeCv(id: number) {
        const cvToRemove = await this.findCvById(id);
;       return await this.cvRepository.remove(cvToRemove);
    }

    async softDeleteCv(id: number) {
        return this.cvRepository.softDelete(id);
    }

    async restoreCv(id: number){
        return this.cvRepository.restore(id)
    }

    async StatCvNumberByAge(maxAge = 100, minAge = 0 ) {
        // Creer un query builder
        const qd = this.cvRepository.createQueryBuilder("cv");
        qd.select("cv.age, count(cv.id) as nombreDeCv")
            .where("cv.age > :minAge and cv.Age < :maxAge")
            .setParameters({minAge, maxAge})
            .groupBy("cv.age");
            console.log(qd.getSql());
            return await qd.getRawMany();
}
}

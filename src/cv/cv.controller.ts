import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {

    constructor(
        private cvService: CvService
    ) {

    }


    @Get()
    async getAllCvs(): Promise<CvEntity[]>{

        return this.cvService.getCvs();

    }

    @Post()
    async addCv(
        @Body() addCvDto: AddCvDto
    ): Promise<CvEntity> {
        return await this.cvService.addCv(addCvDto);
    }

    @Patch(':id')
    async updateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id
    ): Promise<CvEntity> {
        return await this.cvService.updateCv(id, updateCvDto);
    }

    @Patch()
    async updateCv2(
        @Body() updateObject
    ) {
        const {updateCriteria, updateCvDto} = updateObject
        return await this.cvService.updateCv2(updateCriteria, updateCvDto);
    }
}

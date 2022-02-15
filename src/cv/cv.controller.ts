import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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
        
        
    @Patch()
    async updateCv2(
        @Body() updateObject
        ) {
            const {updateCriteria, updateCvDto} = updateObject
            return await this.cvService.updateCv2(updateCriteria, updateCvDto);
        }
        
    @Delete(':id')
    async deleteCv(
        @Param('id', ParseIntPipe) id: number
        ){
            // return this.cvService.removeCv(id);
            return this.cvService.softDeleteCv(id)
        }
        
    @Patch(':id')
    async updateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id
    ): Promise<CvEntity> {
        return await this.cvService.updateCv(id, updateCvDto);
    }
            
    @Get('stats/:max/:min')
    async statsCvNumberByAge(

    ){
        return await this.cvService.StatCvNumberByAge(50,25);
    }
    
    @Get('recover/:id')
    async restoreCv(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.cvService.restoreCv(id);
    }
    @Get(':id')
    async getCv(
        @Param('id', ParseIntPipe) id
    ): Promise<CvEntity>{

        return this.cvService.findCvById(id);

    }
}

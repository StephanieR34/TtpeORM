import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry: {data: string[] }, metadata: ArgumentMetadata) {
    if(metadata.type === 'body') {
      var res = entry.data.map((element:string) => element.toUpperCase()).join("-");
      console.log(res);
      return res;
    }

    return entry;
  }
}

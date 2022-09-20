import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxwidth',
})
export class MaxwidthPipe implements PipeTransform {
  transform(value: string, numOfCharacters: number): string {
    return value.length > numOfCharacters
      ? value.trim().slice(0, numOfCharacters) + '...'
      : value;
  }
}

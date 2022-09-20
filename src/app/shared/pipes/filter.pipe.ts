import { Pipe, PipeTransform } from '@angular/core';
import { Iboard } from '../interfaces/Iboard';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(boards: Array<any>, searchedWord: string = ''): Array<any> {
    if (!searchedWord.trim()) {
      return boards;
    }
    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchedWord.toLowerCase())
    );
  }
}

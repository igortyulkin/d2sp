export class DateFormatter {
  static toDateRow(date: string|null|undefined, separator = ' '): string|null {
    if (date === null || date === undefined) {
      return null;
    }
    return date.split(separator)[0]
  }
}

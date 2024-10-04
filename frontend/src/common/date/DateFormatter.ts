export class DateFormatter {
  static toDateRow(date: string|null|undefined, separator = ' '): string|null {
    if (date === null || date === undefined) {
      return null;
    }
    return date.split(separator)[0]
  }

  static toTimeRow(date: string|null|undefined, separator = ' ', dropMs = true): string|null {
    if (date === null || date === undefined) {
      return null;
    }
    let timeString = date.split(separator)[1] ?? ''
    return dropMs ? (timeString.split('.')[0] ?? timeString) : timeString ;
  }
}

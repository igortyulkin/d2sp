export enum Experience {
 ONE = '1',
 TWO = '2',
 THREE = '3',
 FOUR = '4',
}

export const ExperienceAliases: Record<any, string> = {
 [Experience.ONE]: 'Нет опыта',
 [Experience.TWO]: 'Больше года',
 [Experience.THREE]: 'От года до трех лет',
 [Experience.FOUR]: 'Более трех лте',
}

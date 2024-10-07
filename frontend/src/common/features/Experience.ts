// 'between1And3': 0, 'between3And6': 1, 'moreThan6': 2, 'noExperience': 3
export enum Experience {
 BETWEEN_ONE_AND_THREE = '0',
 BETWEEN_THREE_AND_SIX = '1',
 MORE_THEN_SIX = '2',
 NO_EXPERIENCE = '3',
}

export const ExperienceAliases: Record<any, string> = {
 [Experience.BETWEEN_ONE_AND_THREE]: 'От 1года до 3х лет',
 [Experience.BETWEEN_THREE_AND_SIX]: 'От 3х до 6 лет',
 [Experience.MORE_THEN_SIX]: 'Больше 6ти лет',
 [Experience.NO_EXPERIENCE]: 'Нет опыта',
}

export enum Employment {
 FULL = '0',
 PROJECT_WORK = '1',
 STAGING = '2',
 PART_TIME = '3',
}

export const EmploymentAliases: Record<any, string> = {
 [Employment.FULL]: 'Полная занятость',
 [Employment.PROJECT_WORK]: 'Проектная работа',
 [Employment.STAGING]: 'Стажировка',
 [Employment.PART_TIME]:'Частичная занятость',
}

export enum Schedule {
    SHIFT_WORK = '0',
    FLEXIBLE_SCHEDULE = '1',
    FULL_TIME = '2',
    ROTATING_SCHEDULE = '3',
    REMOTE_WORK = '4'
}

export const ScheduleAliases: Record<any, string> = {
    [Schedule.SHIFT_WORK]: 'Вахтовый метод',
    [Schedule.FLEXIBLE_SCHEDULE]: 'Гибкий график',
    [Schedule.FULL_TIME]: 'Полный день',
    [Schedule.ROTATING_SCHEDULE]: 'Сменный график',
    [Schedule.REMOTE_WORK]: 'Удаленная работа',
}

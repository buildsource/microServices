import { WeekEnum } from '../enum/week.enum';

export interface ISchedules {
    week: WeekEnum,
    hour: [number, number]
} 
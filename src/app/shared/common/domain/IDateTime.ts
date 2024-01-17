// create an enum of the week days
export enum WeekDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export type WeekDaysType = keyof typeof WeekDays

export interface IWeekDay {
  day: WeekDaysType
}
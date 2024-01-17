export interface ITaxes {
  taxes: ITax[]
}

export interface ITax {
  name: string
  percent: number
  active: boolean
  included: boolean
}
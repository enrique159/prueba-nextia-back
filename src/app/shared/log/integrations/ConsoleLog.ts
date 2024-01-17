import { IRequest } from '../interfaces/IRequest'

export default class ConsoleLog {
  private info: IRequest
  private date: string
  private time: string

  constructor(info: IRequest, date: string, time: string) {
    this.info = info
    this.date = date
    this.time = time
  }

  public log() {
    if(this.info.success) console.log(`[${this.info.HttpType} ${this.info.route}] : ${this.info.useremail} : SUCCESS : ${this.date} ${this.time}`)
    else console.log(`[${this.info.HttpType} ${this.info.route}] : ${this.info.useremail} : ERROR : ${this.date} ${this.time} : ${this.info.error}`)
  }
}
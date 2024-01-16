import mongoose from 'mongoose'
import { IDBConnectionManager } from '../interfaces/IDBConnectionManager'
import { MongooseConnectionStatus } from '../interfaces/MongooseStatus'

const BASE_URI = 'mongodb://localhost:27017/sor'

export default class MongooseManager implements IDBConnectionManager {
  private static instance: MongooseManager
  private _uri_connection: string

  private constructor(uri: string = BASE_URI) {
    this._uri_connection = uri
  }

  // Get the instance of the class
  public static getInstance(uri_connection?: string): MongooseManager {
    if (!MongooseManager.instance) {
      MongooseManager.instance = new MongooseManager(uri_connection)
    }

    return MongooseManager.instance
  }

  // Connect to MongoDB
  public async connect(): Promise<void> {
    mongoose.set('strictQuery', false)
    await mongoose.connect(this._uri_connection)
  }

  // Disconnect from MongoDB
  public async disconnect(): Promise<void> {
    await mongoose.disconnect()
  }

  // Get the status of the connection
  public async statusConnection(): Promise<string> {
    return await MongooseConnectionStatus[mongoose.connection.readyState]
  }
}

import { Sequelize, Options, ModelAttributes, Model } from 'sequelize'

const BASE_OPTIONS: Options = {
  host: 'localhost',
  database: 'default',
  username: 'root',
  password: '',
  port: 3306,
  dialect: 'mysql',
}

export default class SequelizeManager extends Sequelize  {
  private static instance: SequelizeManager
  private _options: Options
  public _sequelize: Sequelize | undefined

  private constructor(options: Options = BASE_OPTIONS) {
    super(options)
    this._options = options
  }

  // GET THE INSTANCE OF THE CLASS
  public static getInstance(options?: Options): SequelizeManager {
    if (!SequelizeManager.instance) {
      SequelizeManager.instance = new SequelizeManager(options)
    }
    return SequelizeManager.instance
  }

  // CONNECT TO THE DATABASE
  public async connect(): Promise<void> {
    this._sequelize = new Sequelize(this._options)
    await this._sequelize.authenticate()
  }

  // DISCONNECT FROM THE DATABASE
  public async disconnect(): Promise<void> {
    await this._sequelize?.close()
  }

  // SYNC THE DATABASE
  public async synchronize(): Promise<void> {
    await this._sequelize?.sync()
  }

  // DEFINE MODEL
  public async defineModel<T>(modelName: string, attributes: ModelAttributes) {
    return await this._sequelize?.define<Model<T>>(modelName, attributes)
  }

  // GET THE STATUS OF THE CONNECTION
  public async statusConnection(): Promise<boolean> {
    try {
      await this._sequelize?.authenticate()
      return true
    } catch (error) {
      return false
    }
  }
}
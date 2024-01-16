export const DatabaseTypes = Object.freeze({
  MONGO: 'MONGO',
  MYSQL: 'MYSQL',
  POSTGRES: 'POSTGRES',
  MARIADB: 'MARIADB',
  SQLITE: 'SQLITE',
  ORACLE: 'ORACLE',
  MSSQL: 'MSSQL',
})

export type DatabaseType = typeof DatabaseTypes[keyof typeof DatabaseTypes];
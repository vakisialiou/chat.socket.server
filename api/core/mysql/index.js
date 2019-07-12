import mysql from 'promise-mysql'
import { config } from './../../config'

const pool = mysql.createPool(config['db']['mysql'])

class MySQL {
  constructor(connection) {
    this.pool = connection || pool
  }
  query(sql, params) {
    return this.pool.query(sql, params)
  }

  /**
   *
   * @returns {Promise<MySQL>}
   */
  async beginTransaction() {
    const connection = await this.pool.getConnection()
    const db = new MySQL(connection)
    await db.query('START TRANSACTION')
    return db
  }

  rollback() {
    return this.query('ROLLBACK')
  }

  commit() {
    return this.query('COMMIT')
  }

  async findOne(sql, params) {
    const res = await this.query(sql, params)
    return res.length > 0 ? res[0] : null
  }
}

export const db = new MySQL()
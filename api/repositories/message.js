import fetch from 'node-fetch'
import { config } from './../core'

function prepareApiUrl(path) {
  return `${config.api.host}:${config.api.port}/${path}`
}

/**
 *
 * @param {Object} data
 * @returns {Promise}
 */
export const saveMessage = (data) => {
  return fetch(prepareApiUrl('chat/message/save'), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 *
 * @param {Object} data
 * @returns {Promise}
 */
export const saveRoom = (data) => {
  return fetch(prepareApiUrl('chat/room/save'), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 *
 * @param {Object} data
 * @returns {Promise}
 */
export const removeRoom = (data) => {
  return fetch(prepareApiUrl('chat/room/remove'), {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}
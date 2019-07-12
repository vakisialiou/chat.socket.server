import fetch from 'node-fetch'

/**
 *
 * @param {Object} data
 * @returns {Promise}
 */
export const saveMessage = (data) => {
  return fetch('http://localhost:5000/chat/message/save', {
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
  return fetch('http://localhost:5000/chat/room/save', {
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
  return fetch('http://localhost:5000/chat/room/remove', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}
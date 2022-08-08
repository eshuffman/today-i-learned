import Constants from './constants';

/**
 * @name HttpHelper
 * @description - Utility method for using fetch in a convenient manner
 * @param {string} route address to ping
 * @param {string} method http method
 * @param {Object} payload object to send
 * @return {Promise} - Promise from the fetch call
 */
export default (route, method, payload) => fetch(Constants.BASE_URL_API + route, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  },
  body: JSON.stringify(payload)
});

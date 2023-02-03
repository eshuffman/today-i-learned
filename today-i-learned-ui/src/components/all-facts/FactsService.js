import { toast } from 'react-toastify';
import HttpHelper from '../utils/HttpHelper';
import constants from '../utils/constants';

/**
 * creates a HTTP helper function to retrieve all facts from the API
 * and sets the state for populating the AllFacts page.
 * @param {*} setFacts
 */

async function fetchFacts(setFacts) {
  await HttpHelper(`${constants.FACTS_ENDPOINT}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setFacts);
}

/**
 * HTTP helper function that uses targeted patient ID to delete that patient from the
 * database. If patient has associated encounters, they will not be deleted.
 * @param {*} factToDelete ID of reservation being deleted
 */
async function deleteFact(factToDelete) {
  await HttpHelper(`${constants.FACTS_ENDPOINT}/${factToDelete}`, 'DELETE')
    .then((response) => {
      if (response.ok) {
        toast.success('Cool! That fact is gone forever.');
        return response.json();
      }
      toast.error('Sorry, something weird happened on our end. Try deleting that fact again.');
      throw new Error(constants.API_ERROR);
    });
}

async function fetchDailyFacts(date, setFacts) {
  await HttpHelper(`${constants.FACTS_ENDPOINT}/review/${date}`, 'GET')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(constants.API_ERROR);
  })
  .then(setFacts);
}

export { fetchFacts, deleteFact, fetchDailyFacts };
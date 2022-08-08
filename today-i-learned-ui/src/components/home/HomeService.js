import { toast } from 'react-toastify';
import HttpHelper from '../utils/HttpHelper';
import constants from '../utils/constants';

/**
 * postNewFact is an HTTP helper function to post the new fact to the API
 * @param {*} newFactInfo fact to post
 */

export default async function postNewFact(newFactInfo) {
  await HttpHelper(constants.FACTS_ENDPOINT, 'POST', newFactInfo)
    .then((response) => {
      if (response.ok) {
        toast.success("New fact has successfully been stored in the Fact Vault. Woohoo!");
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    });
}
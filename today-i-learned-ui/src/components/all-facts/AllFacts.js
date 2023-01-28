import { queryByRole } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './AllFacts.module.css';
import { fetchFacts, deleteFacts } from './FactsService';

/**
 * @name AllFacts
 * @description Displays all facts user has inputted, with ability to see and/or delete individual facts
 * @return component
 */

const AllFacts = () => {
  const [facts, setFacts] = useState([]);
  /**
   * UseEffect to fetch all facts from database and set them in a useState for use in displaying on page load.
   */
  useEffect(() => {
      fetchFacts(setFacts)
        
      .catch(() => {
        toast.error('Brain freeze! We\'re having trouble loading your facts right now. Try again in a sec.');
      });
  }, []);



  /**
   * viewFact takes click-target ID and uses it to take the user
   * to the fact details page for the fact associated with the ID.
   * @param {*} e event target
   */
//   const viewFact = (e) => {
//     const factToView = e.target.id;
//     history.push(`/facts/${factToView}`);
//   };

  /**
   * attemptFactDelete is an onClick function that uses the ID from the fact associated with the clicked button and passes back a delete request to the API.
   * @param {*} e event target
   */
//   const attemptFactDelete = (e) => {
//     const factToDelete = e.target.id;
//     deleteFact(factToDelete)
//       .catch(() => {
//         fetchFacts(setFacts);
//       });
//   };
    
  

  return (
      <div>
          <h2>Facts</h2>
        <div >
        {facts.map((fact, id) => (
          <div>
            <div key={id}>
              {fact.question}
            </div>
            <div>{id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFacts;
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './AllFacts.module.css';
import { fetchFacts, deleteFact } from './FactsService';

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
    const attemptFactDelete = (id) => {
      //insert "are you sure you want to delete? check"
    deleteFact(id)
      .catch(() => {
        fetchFacts(setFacts);
      });
  };
    
    function Fact({fact}) {
        
        const handleDetailClick = () => {
            console.log(`details about fact ${fact.id}`)
        }

        const handleDeleteClick = () => {
            attemptFactDelete(fact.id)
        }
        
        return (
            <div className={styles.factContainer}>
                <p className={styles.fact}> {fact.question} </p>
                <p className={styles.fact}> {fact.tags.join(', ')}</p>
                <p className={styles.fact}> {fact.tier}</p>
                <div className={styles.buttonContainer}>
                <button className={styles.allFactsButton} onClick={handleDetailClick}>DETAILS</button>
                    <button className={styles.allFactsButton} onClick={handleDeleteClick}>DELETE</button>
                    </div>
            </div>
        );
  }

  return (
      <div className={styles.appContainer}>
          <div className={styles.innerContainer}>
              <h2 className={styles.welcome}>Facts</h2>
              {facts.map((fact, id) => (
                  <Fact key={id} fact={fact} />
              ))}
        {/* {facts.map((fact, id) => (
          <div className={styles.factContainer}>
            <div className={styles.fact} key={id}>
              {fact.question}
            </div>
                <button className={styles.allFactsButtons}>View</button>
                <button className={styles.allFactsButtons}>Delete</button>
          </div>
        ))} */}
          </div>
    </div >
  );
};

export default AllFacts;
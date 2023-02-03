import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './FactsForReview.module.css';
import { fetchDailyFacts } from '../all-facts/FactsService';

/**
 * @name FactsForReview
 * @description Displays facts user is to review that day
 * @return component
 */

const FactsForReview = () => {
  const [facts, setFacts] = useState([]);
  const date = new Date()
  /**
   * UseEffect to fetch facts for review from database and set them in a useState for use in displaying on page load.
   */
  useEffect(() => {
    console.log(date.date, 'hi')
      fetchDailyFacts(date, setFacts)
        
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

    
    function ReviewFact({fact}) {
        
      const loadNextFact = () => {
          const nextFact = fact.id + 1
            console.log(`details about fact ${nextFact}`)
      }
      

        
        return (
            <div className={styles.factContainer}>
                <p className={styles.fact}> {fact.question} </p>
                <p className={styles.fact}> {fact.tidbit}</p>
                <p className={styles.fact}> Current tier: {fact.tier}</p>
                <div className={styles.buttonContainer}>
                    </div>
            </div>
        );
  }

  return (
      <div className={styles.appContainer}>
          <div className={styles.innerContainer}>
              <h2 className={styles.welcome}>Facts</h2>
              {facts.map((fact, id) => (
                  <ReviewFact key={id} fact={fact} />
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

export default FactsForReview;
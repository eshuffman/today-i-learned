import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import styles from './FactsForReview.module.css';
import { fetchDailyFacts, updateFact } from '../all-facts/FactsService';

/**
 * @name FactsForReview
 * @description Displays facts user is to review that day
 * @return component
 */

const FactsForReview = () => {
  const factTiers = [1, 2, 7, 28, 84, 168, 365]
  const tierMap = new Map()
  const [index, setIndex] = useState(0)
  for (let i = 0; i < factTiers.length; i++){
    tierMap.set(factTiers[i], i)
  }
  const [facts, setFacts] = useState([]);

  const date = new Date()
  const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()+1}` : date.getUTCMonth()+1
  const dateDay = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
  const utcDate = `${date.getUTCFullYear()}-${month}-${dateDay}`
  /**
   * UseEffect to fetch facts for review from database and set them in a useState for use in displaying on page load.
   */
    useMemo(() => {
      fetchDailyFacts(utcDate, setFacts)   
      .catch(() => {
        toast.error('Brain freeze! We\'re having trouble loading your facts right now. Try again in a sec.');
      });
  },[utcDate]);

  function ProgressBar() {
    return (
      <div className={styles.progressBar} />
    )
  }

  function ReviewFact({ fact }) {
      const [revealed, setRevealed] = useState(false)
      const updateTier = (tier, value) => {
        const tierIndex = tierMap.get(tier)
        let offset = 0;
        switch (value) {
          case "great":
            offset = 2
            break;
          case "good":
            offset = 1
            break;
          case "okay":
            offset = 0
            break;
          case "poor":
            offset = -1
            break;
          default:
            return 1;
        }
        
        if (tierIndex + offset <= 0) {
          return 1
        } else return (tierIndex + offset >= 6 ? factTiers[6] : factTiers[tierIndex + offset])
      }

      const calculateNewReviewDate = (tier) => {
        const reviewDate = new Date()
        reviewDate.setDate(reviewDate.getDate() + tier)
        const month = reviewDate.getUTCMonth() < 10 ? `0${reviewDate.getUTCMonth()+1}` : reviewDate.getUTCMonth()+1
        const dateDay = reviewDate.getUTCDate() < 10 ? `0${reviewDate.getUTCDate()}` : reviewDate.getUTCDate()
        const utcReviewDate = `${reviewDate.getUTCFullYear()}-${month}-${dateDay}`
        return utcReviewDate;
      }
      
      const handleRating = (e) => {
        const newTier = updateTier(fact.tier, e.target.value)
        const newFactInfo = {
          id: fact.id,
          question: fact.question,
          tidbit: fact.tidbit,
          tags: fact.tags,
          imgsrc: fact.imgsrc,
          tier: newTier,
          creationDate: fact.creationDate,
          reviewDate: (calculateNewReviewDate(newTier))
        };
        updateFact(Number(fact.id), newFactInfo)
          .then(() => {
            setIndex(index+1)
          })
          .catch(() => {
            toast.error('A server error occured. Updated fact could not be saved.');
          });
      };

        
        return (
            <div className={styles.factContainer}>
                <h2 className={styles.fact}> {fact.question} </h2>
            {revealed === false ?
              <button className={styles.revealButton} onClick={() => setRevealed()}>Reveal tidbit</button>
              : <div className={styles.fact}>
                <p className={styles.fact}> {fact.tidbit}</p>
                <div className={styles.rankingContainer}>
                  <button value='facepalm' className={styles.emojiButton} onClick={(e) => handleRating(e)}>&#x1F926;&#x200D;&#x2640;&#xFE0F;
                    <span className={styles.tooltiptext}>Go back to tier 1</span>
                  </button>
                  <button value='poor' className={styles.emojiButton} onClick={(e) => handleRating(e)}>&#x1F625;
                  <span className={styles.tooltiptext}>Go down one tier</span></button>
                  <button value='okay' className={styles.emojiButton} onClick={(e) => handleRating(e)}>&#x1F610;
                  <span className={styles.tooltiptext}>Stay at current tier</span></button>
                  <button value='good' className={styles.emojiButton} onClick={(e) => handleRating(e)}>&#x1F642;
                  <span className={styles.tooltiptext}>Move up one tier</span>
                  </button>
                  <button value='great' className={styles.emojiButton} onClick={(e) => handleRating(e)}>&#x1F603;<span className={styles.tooltiptext}>Move up two tiers (wow!)</span>
                  </button>
                </div>
                </div>
            }
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
        {/* <ReviewFact fact={facts[index]} /> */}
      </div>
      <div className={styles.progressBarContainer}>
        {facts.map((fact, id) => (
          <ProgressBar key={id} fact={fact} />
        ))}
        </div>
    </div >
  );
};

export default FactsForReview;
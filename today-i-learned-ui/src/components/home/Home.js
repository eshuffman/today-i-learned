import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import postNewFact from './HomeService';
import styles from './Home.module.css';

function Home() {

  const [newFact, setNewFact] = useState({question: '', fact: ''})

  const factInfo = {
    question: (newFact.question),
    fact: (newFact.fact)
  }
  /**
   * attemptFactSubmit posts new question and corresponding fact to API. A success or error toast is displayed as appropraite.
   * If fields are not filled out, the post does not happen.
   */
  const attemptFactSubmit = () => {
      postNewFact(factInfo)
        .catch(() => {
          toast.error("A server error occured. Your fact could not be added to the Fact Vault.");
        });
  };

  /**
   * onFactChange allows fields to be typed into, and sends typed information
   * into newFact useState.
   * @param {*} e field being typed into.
   */
   const onFactChange = (e) => {
    setNewFact({ ...newFact, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.factWrapper}>
          <header className={styles.title}>
          <p>
            Welcome to SpacedCadet's Spaced Repetition Memory WebApp
          </p>
          </header>
          <p>
            Please enter a question and corresponding answer to begin your process of Rememembry:
          </p>
          <TextField
            id="question" 
            label="Please Input Question"
            variant="standard"
            value={newFact.question}
            onChange={onFactChange}
          />
          <TextField
            id="fact"
            multiline
            rows={4}
            label="Please input fact you would like to remember."
            variant="standard"
            value={newFact.fact}
            onChange={onFactChange}
        />
        <Button variant="outlined" onClick={attemptFactSubmit}>Submit</Button>
      </div>
    </div>
  );
}

export default Home;
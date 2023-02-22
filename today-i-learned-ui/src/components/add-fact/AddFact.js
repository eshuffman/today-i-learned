import React, { useState } from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import { toast } from 'react-toastify';
import styles from './AddFact.module.css';
import Dialog from '@mui/material/Dialog'
import { addFact } from '../all-facts/FactsService';

/**
 * @name AddFact
 * @description Ability to add facts -- button is sticky on every page
 * @return component
 */
const AddFact = () => {
  const [showModel, setShowModel] = useState(false);
  const [newFact, setNewFact] = useState({
    question: '', tidbit: '', imgsrc: ''
  });
  const [tags, setTags] = useState([])
  
  const date = new Date()
  const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()+1}` : date.getUTCMonth()+1
  const dateDay = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
  const utcDate = `${date.getUTCFullYear()}-${month}-${dateDay}`
  const utcTomorrow = `${date.getUTCFullYear()}-${month}-${dateDay + 1}`
  
  const attemptFactSubmit = () => {
    addFact(factInfoPacket)
      .then(() => {
        setShowModel(false)
      })
      .catch(() => {
        toast.error(`A server error occured. Your fact could not be added.`);
      });
  };

  const factInfoPacket = {
    question: (newFact.question),
    tidbit: (newFact.tidbit),
    imgsrc: (newFact.imgsrc),
    tags: ([...tags]),
    tier: 1,
    creationDate: utcDate,
    reviewDate: utcTomorrow
      
    
    }
  const onQuestionChange = (e) => {
    setNewFact({ ...newFact, [e.target.id]: e.target.value });
  };

  const onTagChange = (e) => {
    setTags([...tags, e.target.value]);
  }
  
  function AddFactModel() {
        return (
          <div>
            <Dialog open={showModel} onClose={() => setShowModel(false)} >
              <div className={styles.modelBox}>
                <h1>Add New Fact</h1>
                <div className={styles.input}>
                <div className={styles.formLabel}>
              Question
                </div>
            <input
              id="question"
              placeholder="Please enter question."
              type="text"
              value={newFact.question}
              onChange={onQuestionChange}
                />
            <div className={styles.formLabel}>
              Tidbit
                </div>
            <textarea
              id="tidbit"
              placeholder="Please enter tidbit of information related to your question."
              type="text"
              value={newFact.tidbit}
              onChange={onQuestionChange}
                />
            <div className={styles.formLabel}>
              Image Source (Optional)
                </div>
            <input
              id="imgsrc"
              placeholder="Please enter image URL associated with question."
              type="text"
              value={newFact.imgsrc}
              onChange={onQuestionChange}
                  />
                </div>
                <div className={styles.buttonBox}> 
                  <button className={styles.submit} onClick={attemptFactSubmit}>Submit</button>
                </div>
              </div>
            </Dialog>
            </div>
        )
    }

  return (
    <div className={styles.box}>
      <div>
        <AddCircle fontSize="large" className={styles.icon} onClick={() => setShowModel(true)} />
      </div>
      {showModel ? <AddFactModel /> : null}
    </div>
  );
};

export default AddFact;
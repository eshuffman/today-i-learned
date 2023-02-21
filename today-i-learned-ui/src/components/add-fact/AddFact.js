import React, { useState } from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
//import { toast } from 'react-toastify';
import styles from './AddFact.module.css';
import Dialog from '@mui/material/Dialog'
//import { addFact } from '../all-facts/FactsService';

/**
 * @name AddFact
 * @description Ability to add facts -- button is sticky on every page
 * @return component
 */
const AddFact = () => {
    const [showModel, setShowModel] = useState(false);

  function AddFactModel() {
      console.log('hi')
        return (
          <div>
            <Dialog open={showModel} onClose={() => setShowModel(false)}>
              <div className={styles.modelBox}>
                Hi!
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
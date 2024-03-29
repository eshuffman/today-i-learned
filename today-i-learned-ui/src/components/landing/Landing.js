import React from 'react';
import styles from './Landing.module.css';
import { NavLink } from 'react-router-dom';

function Landing() {

//   const [newFact, setNewFact] = useState({question: '', tidbit: ''})

//   const factInfo = {
//     question: (newFact.question),
//     tidbit: (newFact.tidbit)
//   }
//   /**
//    * attemptFactSubmit posts new question and corresponding fact to API. A success or error toast is displayed as appropraite.
//    * If fields are not filled out, the post does not happen.
//    */
//   const attemptFactSubmit = () => {
//       console.log(factInfo)
//       postNewFact(factInfo)
//         .catch(() => {
//           toast.error("A server error occured. Your fact could not be added to the Fact Vault.");
//         });
//   };

//   /**
//    * onFactChange allows fields to be typed into, and sends typed information
//    * into newFact useState.
//    * @param {*} e field being typed into.
//    */
//    const onFactChange = (e) => {
//     setNewFact({ ...newFact, [e.target.id]: e.target.value });
//   };

  return (
    <div className={styles.appContainer}>
          <div className={styles.innerContainer}>
          <p className={styles.welcome}>
            Welcome back to BrainReps! What would you like to do today?
          </p>
          <NavLink to="/facts/review">
              <button className={styles.landingButton}>
                Let's get started with today's fact review! 
          </button>
          </NavLink>
        <NavLink to="/facts">
              <button className={styles.landingButton}>
                I'd like to see all my facts, please.
          </button>
        </NavLink>
        
              <button className={styles.landingButton}>
                Help! I'm new here!
          </button>
          
        </div>
    </div>
  );
}

export default Landing;
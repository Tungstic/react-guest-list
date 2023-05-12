import { useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  // declare state variable
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    attending: false,
  });
  /*
  function clearInput(event) {
    event.currentTarget.value = '';
  } */

  function addGuest(event) {
    if (event.key === 'Enter') {
      setNewGuest({
        firstName: newGuest.firstName,
        lastName: newGuest.lastName,
        attending: newGuest.attending,
      });
    }
    console.log(newGuest);
    // clearInput();
  }

  return (
    <>
      <h1>Create a guest list for your event</h1>

      <div>Add a guest using their first and last name</div>

      <label>
        First name
        <input
          className={styles.padding}
          onChange={(event) =>
            setNewGuest({
              firstName: event.currentTarget.value,
              lastName: newGuest.lastName,
              attending: newGuest.attending,
            })
          }
        />
      </label>
      <label>
        Last name
        <input
          className={styles.padding}
          onChange={(event) =>
            setNewGuest({
              firstName: newGuest.firstName,
              lastName: event.currentTarget.value,
              attending: newGuest.attending,
            })
          }
          onKeyDown={addGuest}
        />
      </label>

      <div data-test-id="guest">
        <div>Guest info here</div>
        <input type="checkbox" aria-label="attending status" />
        <button>Remove</button>
      </div>
    </>
  );
}

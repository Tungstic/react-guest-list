// import styles from './App.module.scss';
import { useState } from 'react';

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
  // Also need to add the updated guest to the api array onKeyDown and clear inputs

  function handleInputs(event) {
    const value = event.currentTarget.value;
    setNewGuest({
      ...newGuest,
      [event.currentTarget.name]: value,
    });
    console.log(newGuest);
  }

  return (
    <>
      <h1>Create a guest list for your event</h1>

      <div>Add a guest using their first and last name</div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>
          First name
          <input
            name="firstName"
            value={newGuest.firstName}
            onChange={handleInputs}
          />
        </label>
        <label>
          Last name
          <input
            name="lastName"
            value={newGuest.lastName}
            onChange={handleInputs}
          />
        </label>
      </form>

      <div data-test-id="guest">
        <div>Guest info here</div>
        <input type="checkbox" aria-label="attending status" />
        <button>Remove</button>
      </div>
    </>
  );
}

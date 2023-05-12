import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'http://localhost:4000';

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

  async function postGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newGuest.firstName,
        lastName: newGuest.lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);

    postGuest().catch((error) => {
      console.log(error);
    });
  }

  function addGuest(event) {
    if (event.key === 'Enter') {
      setNewGuest({
        firstName: newGuest.firstName,
        lastName: event.currentTarget.value,
        attending: newGuest.attending,
      });
    }
    // console.log(newGuest);
    // clearInput()
  }

  return (
    <>
      <h1>Create a guest list for your event</h1>

      <div>Add a guest using their first and last name</div>

      <label>
        First name
        <input
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
        <input onKeyDown={addGuest} />
      </label>

      <div data-test-id="guest">
        <div>Guest info here</div>
        <input type="checkbox" aria-label="attending status" />
        <button>Remove</button>
      </div>
    </>
  );
}

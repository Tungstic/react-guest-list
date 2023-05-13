import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'http://localhost:4000';

  // declare state variable
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    attending: false,
  });

  // 1. when we want to trigger an action on first render
  useEffect(() => {
    async function firstRenderFetch() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setIsLoading(false);
    }

    firstRenderFetch().catch((error) => {
      console.log(error);
    });
  }, []); // triggers only on the first render

  /*
  function clearInput(event) {
    event.currentTarget.value = '';
  } */

  function addGuest(event) {
    if (event.key === 'Enter') {
      setNewGuest({
        firstName: newGuest.firstName,
        lastName: event.currentTarget.value,
        attending: newGuest.attending,
      });
    }
    console.log(newGuest);
    setGuests(newGuest);
    console.log(guests);
    // clearInput()
  }

  // send newGuest to API
  useEffect(() => {
    async function postGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGuest),
      });
      const createdGuest = await response.json();
      guests.push(createdGuest);
    }
  }, [newGuest, guests]); // trigger every time newGuest is updated

  if (isLoading) {
    return (
      <>
        <h1>Create a guest list for your event</h1>

        <div>Add a guest using their first and last name</div>

        <label>
          First name
          <input disabled="true" />
        </label>
        <label>
          Last name
          <input disabled="true" />
        </label>

        <div data-test-id="guest">
          <div>Loading...</div>
          <input
            disabled="true"
            type="checkbox"
            aria-label="attending status"
          />
          <button disabled="true">Remove</button>
        </div>
      </>
    );
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
        <div>{JSON.stringify(guests)}</div>
        <input type="checkbox" aria-label="attending status" />
        <button>Remove</button>
      </div>
    </>
  );
}

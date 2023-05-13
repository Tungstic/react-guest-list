import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'http://localhost:4000';

  // declare state variable
  const apiList = () => {
    fetch(`${baseUrl}/guests`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    attending: false,
  });

  // first rendering of the page
  useEffect(() => {
    function firstRenderFetch() {
      fetch(`${baseUrl}/guests`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setGuests([...data]);
          console.log(guests);
        })
        .catch((error) => console.log(error));
    }
    setIsLoading(false);
  }, []); // triggers only on the first render

  /*
  function clearInput(event) {
    event.currentTarget.value = '';
  } */

  function postGuest() {
    fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newGuest.firstName,
        lastName: newGuest.lastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGuests([...guests, data]);
      })
      .catch((error) => console.log(error));
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
    postGuest();
    // clearInput()
  }
  // render API's guest list on every update of it
  /*   useEffect(() => {
    function displayGuests() {
      fetch(`${baseUrl}/guests`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));
    }
  }, [guests]); */

  /* async function postGuest() {
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
    setGuests([...guests, createdGuest]);

    postGuest().catch((error) => {
      console.log(error);
    });
  } */

  useEffect(() => {
    apiList();
  }, [guests]);

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

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

  /*  const apiList = () => {
    fetch(`${baseUrl}/guests`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
 */
  // first rendering of the page
  useEffect(() => {
    async function firstRenderFetch() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      console.log('look here 1');
      console.log(data);

      setIsLoading(false); // Set isLoading to false after the response is received
    }

    firstRenderFetch().catch((error) => {
      console.log(error);
      console.log('error 1');
    });
  }, []);

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
        console.log('look here 2');
        console.log(data);
        console.log('my guests' + guests);
        setGuests([...guests, data]);
      })
      .catch((error) => {
        console.log(error);
        console.log('error 2');
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
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

  useEffect(() => {
    fetch(`${baseUrl}/guests`)
      .then((response) => response.json())
      .then((data) => {
        console.log('look here 3');
        console.log(data);
        // setGuests(data); DO NOT DO THAT
      })
      .catch((error) => {
        console.log(error);
        console.log('error 3');
      });
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
      <form onSubmit={handleSubmit}>
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
          <input
            onChange={(event) =>
              setNewGuest({
                firstName: newGuest.firstName,
                lastName: event.currentTarget.value,
                attending: newGuest.attending,
              })
            }
          />
        </label>
        <button className="hideButton">Submit</button>
      </form>

      <div data-test-id="guest">
        {/* use map method to print each guest?? */}
        <div>guest list here</div>
        <input type="checkbox" aria-label="attending status" />
        <button>Remove</button>
      </div>
    </>
  );
}

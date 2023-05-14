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

  // send a newGuest to api (function declared, will be called onSubmit)
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
        setGuests([...guests, data]);
        console.log('my guests' + JSON.stringify(guests)); // Here "guests" consists of empty array
      })
      .catch((error) => {
        console.log(error);
        console.log('error 2');
      });
  }
  // modify guests array, send the new guest to api (calling postGuest()) and clear inputs
  function handleSubmit(event) {
    event.preventDefault();
    setGuests([...guests, newGuest]);
    postGuest();
    setNewGuest({
      firstName: '',
      lastName: '',
      attending: false,
    });
  }

  // delete guest from api list by id
  function deleteGuest(id) {
    fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('look here 4');
        console.log(data);
        const updatedList = guests.filter((guest) => {
          return guest['id'] !== data['id'];
        });
        setGuests(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // remove a guest from list
  /*   function handleClick(event) {
    event.preventDefault();
  } */

  // need to map over data?? to display each guest
  useEffect(() => {
    fetch(`${baseUrl}/guests`)
      .then((response) => response.json())
      .then((data) => {
        console.log('look here 3');
        console.log(data);
        console.log(guests);
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
            value={newGuest.firstName}
            onChange={(event) =>
              setNewGuest({ ...newGuest, firstName: event.currentTarget.value })
            }
          />
        </label>
        <label>
          Last name
          <input
            value={newGuest.lastName}
            onChange={(event) =>
              setNewGuest({ ...newGuest, lastName: event.currentTarget.value })
            }
          />
        </label>
        <button className="hideButton">Submit</button>
      </form>

      <div data-test-id="guest">
        {guests.map((guest) => {
          return (
            <div key={`guest ${guest['id']}`}>
              {guest['firstName'] + ' ' + guest['lastName']}
              <input type="checkbox" aria-label="attending status" />
              <button onClick={() => deleteGuest(guest['id'])}>Remove</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

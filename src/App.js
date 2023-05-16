import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'https://5df1f724-67c0-4a68-b515-7277cefd024f.id.repl.co';

  // declare state variable
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
  });

  // first rendering of the page and setting local list (guests) to api list
  useEffect(() => {
    async function firstRenderFetch() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      console.log(data);
      setGuests(data);

      setIsLoading(false); // Set isLoading to false after the response is received
    }

    firstRenderFetch().catch((error) => {
      console.log(error);
    });
  }, []);

  // add newGuest to api (function declared, will be called onSubmit)
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
      .catch((error) => {
        console.log(error);
      });
  }
  // send newGuest to api and clear inputs by pressing Enter
  function handleSubmit(event) {
    event.preventDefault();
    setGuests([...guests, newGuest]);
    postGuest();
    setNewGuest({
      firstName: '',
      lastName: '',
    });
  }

  // toggle attending status of existing guest
  function toggleCheckbox(id, boolean) {
    fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: boolean }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const updatedGuestList = guests.map((obj) => {
          if (obj.id === data.id) {
            return { ...obj, attending: boolean };
          }
          return obj;
        });
        setGuests(updatedGuestList);
      })
      .catch((error) => console.log(error));
  }

  // delete guest from api list by id
  function deleteGuest(id) {
    fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
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
        <div>Loading...</div>
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
              <input
                type="checkbox"
                aria-label="attending status"
                checked={guest.attending}
                onChange={(event) =>
                  toggleCheckbox(guest['id'], event.currentTarget.checked)
                }
              />
              <button onClick={() => deleteGuest(guest['id'])}>Remove</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

// 1. when we want to trigger an action on first render
useEffect(() => {
  async function firstRenderFetch() {
    const response = await fetch('https://randomuser.me/api');

    const data = await response.json();

    setUsers([data.results[0]]);
  }

  firstRenderFetch().catch((error) => {
    console.log(error);
  });
}, []); // triggers only on the first render

// send a guest to API
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

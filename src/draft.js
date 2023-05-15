// using useState to toggle checkbox

const [checkbox, setCheckbox] = useState(false);

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
      console.log('look here 5');
      console.log(data);
      setCheckbox(data.attending);
      const updatedGuestList = guests.filter((i) => {
        return i.id !== data.id;
      });
      setGuests([...guests], updatedGuestList);
    })
    .catch((error) => console.log(error));
}

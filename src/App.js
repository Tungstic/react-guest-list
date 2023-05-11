// import styles from './App.module.scss';

export default function App() {
  return (
    <>
      <h1>Create a guest list for your event</h1>

      <div>Add a guest using their first and last name</div>

      <form>
        <label>
          First name
          <input />
        </label>
        <label>
          Last name
          <input />
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

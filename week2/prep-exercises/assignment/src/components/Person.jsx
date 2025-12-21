const Person = ({ person }) => {
  if (!person) {
    return <div>Loading...</div>; // Добавим для видимости
  }

  return (
    <div>
      <h2>Person Details</h2>
      <ul>
        <li>First name: {person.firstName}</li>
        <li>Last name: {person.lastName}</li>
        <li>Email: {person.email}</li>
      </ul>
    </div>
  );
};

export default Person;
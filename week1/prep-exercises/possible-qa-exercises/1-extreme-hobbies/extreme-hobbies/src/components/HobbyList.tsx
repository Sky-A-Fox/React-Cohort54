import Hobby from "./Hobby";

const hobbies = ["Surfing", "Rock climbing", "Mountain biking", "Breakdancing"];

function HobbyList() {
  return (
    <ul>
      {hobbies.map((item, index) => (
        <Hobby key={index} hobby={item} />
      ))}
    </ul>
  );
}

export default HobbyList;

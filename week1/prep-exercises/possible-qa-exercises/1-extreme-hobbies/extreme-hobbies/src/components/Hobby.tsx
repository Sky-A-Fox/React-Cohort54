type HobbyProps = {
  hobby: string;
};

function Hobby({ hobby }: HobbyProps) {
  return <li>{hobby}</li>;
}

export default Hobby;

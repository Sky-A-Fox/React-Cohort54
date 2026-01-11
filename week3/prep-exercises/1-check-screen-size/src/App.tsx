import { Avatar } from './components/Avatar';
import { Mithi, Diana, Mikong } from './avatars/baseAvatars';
import { useScreenRange } from './hooks/useScreenRange';

function App() {
  const isBig = useScreenRange(1000, Infinity, 'big');
  const isMedium = useScreenRange(700, 999, 'medium');
  const isSmall = useScreenRange(0, 699, 'small');

  return (
    <div>
      <h1>Avatars by screen size</h1>
      {isBig && <Avatar baseProps={Mithi} />}
      {isMedium && <Avatar baseProps={Diana} />}
      {isSmall && <Avatar baseProps={Mikong} />}
    </div>
  );
}

export default App;

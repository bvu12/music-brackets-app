interface LandingPageProps {
  onCreateClick: () => void;
  onJoinClick: () => void;
  setDesiredRoomString: (arg0: string) => void;
}

export default function LandingPage({
  onCreateClick,
  onJoinClick,
  setDesiredRoomString,
}: LandingPageProps) {
  return (
    <div className="App">
      <div>
        <div>Create a room</div>
        <button onClick={onCreateClick}> Create room</button>
      </div>
      <div>
        <input
          placeholder="Enter a room number..."
          onChange={(event) => {
            setDesiredRoomString(event.target.value);
          }}
        />
        <button onClick={onJoinClick}> Join room</button>
      </div>
    </div>
  );
}

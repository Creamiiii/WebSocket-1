import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [sentMessage, setSentMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {message: sentMessage, room: room});
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", {room: room});
      alert(`Joined Room "${room}"`);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    })
  });

  return (
    <div className="App">
      <input placeholder="Room No..." onChange={(event) => {
        setRoom(event.target.value);
      }}/>
      <button onClick={joinRoom}> Join Room</button>
      <input placeholder='Message...' onChange={(event) => {
        setSentMessage(event.target.value);
      }}/>
      <button onClick={sendMessage}> Send Message</button>
      <h1>Messages:</h1>
      {receivedMessage}
    </div>
  );
}

export default App;

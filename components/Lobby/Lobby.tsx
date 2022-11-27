// import { Modal, Button, Group, TextInput } from "@mantine/core";
// import { useForm } from "@mantine/form";

// import { Player } from "../../shared/types";

// export const Lobby = ({
//   room,
//   timer,
//   resumeTimer,
//   pauseTimer,
//   isTimerPaused,
//   restartTimer,
//   stopTimer,
//   players,
// }) => {
//   return (
//     <div>
//       <h1>You have joined room: {room}</h1>
//       <div> {timer.toPrecision(4)} </div>
//       {isTimerPaused && <button onClick={resumeTimer}> Resume timer</button>}
//       {!isTimerPaused && <button onClick={pauseTimer}> Pause timer</button>}
//       <button onClick={restartTimer}> Restart timer</button>
//       <button onClick={stopTimer}> Stop timer</button>
//       {players.map((player: Player) => {
//         return socket.id === player.playerSocketId ? (
//           <div>
//             <Modal
//               opened={opened}
//               onClose={() => setOpened(false)}
//               title="Introduce yourself!"
//             >
//               <form
//                 onSubmit={form.onSubmit((values) => {
//                   socket.emit("set_username", values.username);
//                   setOpened(false);
//                 })}
//               >
//                 <TextInput
//                   withAsterisk
//                   label="Enter your username!"
//                   placeholder="Username"
//                   data-autoFocus
//                   {...form.getInputProps("username")}
//                 />
//                 <Group position="right" mt="md">
//                   <Button type="submit">Submit</Button>
//                 </Group>
//               </form>
//             </Modal>
//             <Button onClick={() => setOpened(true)}>Open Modal</Button>
//             <h2 key="playerSocketId"> {player.username} </h2>
//           </div>
//         ) : (
//           <div key="playerSocketId"> {player.username} </div>
//         );
//       })}
//     </div>
//   );
// };

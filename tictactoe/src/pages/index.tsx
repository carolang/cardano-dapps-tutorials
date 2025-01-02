import Board from "../components/Board"
import Game from "../components/Game"

export default function Home() {
  var game = new Game({});
  var board = new Board({"game": game});
  
  return (
    <main>
      {board.render()}
    </main>
  );
}

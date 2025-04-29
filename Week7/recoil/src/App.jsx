import { RecoilRoot} from "recoil";
import Game from "./components/Game";
import Todo from "./components/Todos";

function App() {
  return (
    <>
      <RecoilRoot>
        <Game/>
        <Todo/>
      </RecoilRoot>
    </>
  );
}

export default App;

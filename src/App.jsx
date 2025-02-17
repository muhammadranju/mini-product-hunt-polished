import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { BorderBeam } from "./components/ui/border-beam";
import { FlipWords } from "./components/ui/flip-words";

const words = ["better", "cute", "beautiful", "modern"];
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Border Beam
        </span>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <Button className="bg-gray-950 text-gray-100 dark:bg-gray-100 dark:text-gray-950">
        Hello
      </Button>
      <div className="h-[40rem] flex justify-center items-center px-4">
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Build
          <FlipWords words={words} /> <br />
          websites with Aceternity UI
        </div>
      </div>
    </>
  );
}

export default App;

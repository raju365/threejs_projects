import "./App.css";
import Dog from "./components/Dog";
import { Canvas } from "@react-three/fiber";
function App() {
  return (
    <>
      <main>
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundImage: "url(/background-l.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Dog />
        </Canvas>
        <section id="section1"></section>
        <section id="section2"></section>
        <section id="section3"></section>
      </main>
    </>
  );
}

export default App;

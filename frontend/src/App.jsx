import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="bg-sky-300 h-screen w-screen relative overflow-x-hidden">
      <Header />
      <div className="w-[96%] mx-auto min-h-[82.3%]">
        <div className="rounded-lg p-4 mt-4 grid grid-cols-5 gap-10 my-10"></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

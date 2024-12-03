import BinarySearchTreeVisualizer from "./components/BinarySearchTreeVisualizer"
import Footer from "./components/Footer"
import Header from "./components/Header"


function App() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

    <Header/>
    <main className="flex-grow"> 
         <BinarySearchTreeVisualizer/>
    </main>
        <Footer/>
    </div>
  )
}

export default App

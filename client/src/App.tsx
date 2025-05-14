import Header from './Header.tsx'
import Body from './Body.tsx';
import Footer from './Footer.tsx';
const App = () => {

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-300">
      <Header />
      <Body /> 
      <Footer />
    </div>
    </>
  );
}

export default App

import logo from './logo.svg';
import './App.css';
import PostalCode from './Components/PostalCode';
import PincodeLookup from './Components/PincodeLookup';

function App() {
  return (
    <div >
      <div class="lds-circle"><div></div></div>
        <PostalCode/>
        {/* <PincodeLookup/> */}
    </div>
  );
}

export default App;

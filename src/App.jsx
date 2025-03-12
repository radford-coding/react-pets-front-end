import { useState, useEffect } from 'react';
import * as petService from './services/petService.js';
import PetList from './components/PetList/PetList.jsx';
import './App.css';

const App = () => {

  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { // useEffect runs on page load
    const fetchPets = async () => { // can't have async directly inside useEffect, must nest
      try {
        const fetchedPets = await petService.index();
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err);
        };
        setPets(fetchedPets);
      } catch (error) {
        console.log(error);
      };
    };
    fetchPets();
  }, []);

  const handleSelect = (pet) => {
    setSelected(pet);
  };

  return (
    <>
      <PetList pets={pets} handleSelect={handleSelect}/>
    </>
  );
};

export default App;
import { useState, useEffect } from 'react';
import * as petService from './services/petService.js';
import PetList from './components/PetList/PetList.jsx';
import PetDetail from './components/PetDetail/PetDetail.jsx';
import PetForm from './components/PetForm/PetForm.jsx';
import './App.css';

const App = () => {

  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    setIsFormOpen(false);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      console.log(newPet);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
        isFormOpen={isFormOpen}
        handleFormView={handleFormView}
      />
      {isFormOpen
        ? <PetForm handleAddPet={handleAddPet}/>
        : <PetDetail selected={selected} />
      }
    </>
  );
};

export default App;
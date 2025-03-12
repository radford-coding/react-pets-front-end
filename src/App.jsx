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

  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      // console.log(newPet);
      setPets([newPet, ...pets]);
    } catch (error) {
      console.log(error);
    };
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);
      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      };
      const updatedPetList = pets.map(pet => pet._id === updatedPet._id ? updatedPet : pet);
      setPets(updatedPetList);
      setSelected(updatedPet);
      // console.log(updatedPet);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    };
  };

  const handleAdoptPet = async (petId) => {
    try {
      const adoptedPet = await petService.adoptPet(petId);
      if (adoptedPet.err) {
        throw new Error(adoptedPet.err);
      };
      const updatedPetList = pets.filter(pet => pet._id !== petId);
      setPets(updatedPetList);
      setSelected(null);
      setIsFormOpen(false);
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
        ? <PetForm
          handleAddPet={handleAddPet}
          handleUpdatePet={handleUpdatePet}
          selected={selected}
        />
        : <PetDetail
          selected={selected}
          handleFormView={handleFormView}
          handleAdoptPet={handleAdoptPet}
        />
      }
    </>
  );
};

export default App;
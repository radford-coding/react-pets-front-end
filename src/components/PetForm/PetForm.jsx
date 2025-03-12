import { useState } from "react";

const PetForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        breed: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleAddPet(formData);
    };

    return (
        <div>
            <h2>add a new pet:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> Name </label>
                <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <label htmlFor="age"> Age </label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <br />
                <label htmlFor="breed"> Breed </label>
                <input
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Add New Pet</button>
            </form>
        </div>
    );
};

export default PetForm
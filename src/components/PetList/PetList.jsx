
const PetList = (props) => {

    return (
        <div>
            <h1>Pet List</h1>
            <div>
                {!props.pets.length ? (
                    <h2>No Pets Yet!</h2>
                ) : (
                    <ul>
                        {props.pets.map((pet) => (
                            <li
                                key={pet._id}
                                style={{
                                    cursor: 'pointer',
                                    color: '#646CFF'
                                }}
                                onClick={() => props.handleSelect(pet)}
                            >{pet.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'close form' : 'add a new pet'}
            </button>
        </div>
    );
};

export default PetList;
const PetDetail = (props) => {

    if (!props.selected) {
        return (
            <div>
                <h2>[no details]</h2>
            </div>
        );
    };

    return (
        <div>
            <h2>{props.selected.name}</h2>
            <p>Breed: {props.selected.breed}</p>
            <p>Age: {props.selected.age} year{props.selected.age > 1 ? 's' : ''} old</p>
            <div>
                <button onClick={() => props.handleFormView(props.selected)}>
                    edit
                </button>
                <button onClick={() => props.handleAdoptPet(props.selected._id)}>
                    delete
                </button>
            </div>
        </div>
    );

};

export default PetDetail
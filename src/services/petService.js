const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL); // GET /pets
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

// console.log(await index());

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    index,
    create,
};
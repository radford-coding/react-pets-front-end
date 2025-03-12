const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL); // GET /pets
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

console.log(index());

export {
    index,
};
import { useState, useEffect } from "react";

const localCache = {};

//Custom Hooks other hooks packaged together 
export default function useBreedList(animal) {
    const [breedList, setBreedsList] = useState([]);

    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        if (!animal) {
            setBreedsList([]);
        }
        else if (localCache[animal]) {
            setBreedsList(localCache[animal])
        }
        else {
            requestBreedList();
        }

        async function requestBreedList() {
            setBreedsList([]);
            setStatus("Loading");

            const res = await fetch(
                `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
            )
            const json = await res.json();
            localCache[animal] = json.breeds || []
            setBreedsList(localCache[animal]);
            setStatus("Loading");

        }
    }, [animal])
    
    return [breedList, status];
}    
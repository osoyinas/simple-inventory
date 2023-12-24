import { getPersons } from '@/api/person';
import { Option } from '@/types/types';
import { useState, useEffect } from 'react';
export function usePersonOptions() {
    const [personsAsOptions, setPersonOptions] = useState<Option[]>([] as  Option[]);
    useEffect(() => {
        getPersons().then((response) => {
            console.log("LLAMANDO A PERSONAS");
            const options = response.data?.map((person) => ({value: person.id, name: person.name}));
            setPersonOptions(options? options: []);
        }).catch((error) => console.error(error));
    
    }, []);
    return {personsAsOptions};
}
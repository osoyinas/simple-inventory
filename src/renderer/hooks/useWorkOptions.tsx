import { getWorks } from '@/api/work';
import { useState, useEffect } from 'react';
import { Option } from '@/types/types';

export function UseWorkOptions() {

    const [worksAsOptions, setWorkOptions] = useState<Option[]>([] as  Option[]);
    useEffect(() => {
        getWorks()
            .then((response) => {
                const options = response.data?.map((work) => ({value: work.id, name: work.name}));
                setWorkOptions(options? options: []);
            })
            .catch((error) => console.error(error));
    }, []);

    return {worksAsOptions}
}
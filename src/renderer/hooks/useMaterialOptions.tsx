import { getMaterials } from '@/api/material';
import { Option } from '@/types/types';
import { useState, useEffect } from 'react';
export function useMaterialOptions() {
    const [materialsAsOptions, setMaterialOptions] = useState<Option[]>([] as  Option[]);
    useEffect(() => {
        getMaterials().then((response) => {
            const options = response.data?.map((material) => ({value: material.id, name: material.name}));
            setMaterialOptions(options? options: []);
        }).catch((error) => console.error(error));
    
    }, []);
    return { materialsAsOptions };
}
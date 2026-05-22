

import * as XLSX from 'xlsx';

export interface Property {
    id: number;

    title: string;

    rentPrice: number;

    salePrice: number;

    description: string;

    transactionType: string;

    type: string;

    status: string;

    bathrooms: number;

    bedrooms: number;

    garages: number;

    area: number;

    images: string[];

    street: string;

    number: string;

    complement: string;

    neighborhood: string;

    city: string;

    state: string;

    zipCode: string;

    country: string;

    virtualTourUrl: string;

    iptu: number;

    condominiumFee: number;

    videos: string[];

    latitude: number;

    longitude: number;

    featured: boolean;

    ownerId: number;

    realtorId: number;
}

export async function importProperties(
    file: File
): Promise<Property[]> {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (event) => {

            try {

                const data = event.target?.result;

                const workbook = XLSX.read(data, {
                    type: 'binary'
                });

                const sheetName = workbook.SheetNames[0];

                const sheet = workbook.Sheets[sheetName];

                const jsonData =
                    XLSX.utils.sheet_to_json<any>(sheet);

                const formattedData = jsonData.map(
                    (item, index) => ({
                        ...item,

                        id: Date.now() + index,

                        images: item.images
                            ? String(item.images).split(' | ')
                            : []
                    })
                );

                resolve(formattedData);

            } catch (error) {

                reject(error);

            }
        };

        reader.onerror = reject;

        reader.readAsBinaryString(file);

    });
}
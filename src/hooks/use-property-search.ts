import { useState, useEffect } from "react";
import axios from "axios";

type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
};

function usePropertySearch(searchTerm: string): Property[] {
  const [properties, setProperties] = useState<Property[]>([]);

  const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProperties([]);
      return;
    }

    const fetchProperties = async () => {
      try {
        const response = await axios.get<Property[]>(
          `${url}/property/search`,
          {
            params: {
              search: searchTerm,
            },
          }
        );

        setProperties(response.data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };

    fetchProperties();
  }, [searchTerm, url]);

  return properties;
}

export default usePropertySearch;
import { useState, useEffect } from "react";

export function useData(refreshTime = 3600 * 1000) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {


        const getData = async () => {
            try {
                setError(null)

                const res = await fetch("api/data");

                if (!res.ok) {
                    throw new Error(`Erreur HTTP: ${res.status}`)
                }

                const data = await res.json();

                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || "Une erreur s'est produite");
                setLoading(false);
            }
        };

        getData();

        const interval = setInterval(getData, refreshTime);

        return () => {
            clearInterval(interval);
        }
    }, [refreshTime]);

    return { weatherData, loading, error };
}
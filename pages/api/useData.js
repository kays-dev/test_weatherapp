import { useState, useEffect } from "react";

export function useData(refreshTime = 3600 * 1000) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);

    useEffect(() => {


        const getData = async () => {
            try {
                setErrorMessage(null);
                setErrorStatus(null);

                const res = await fetch("api/data");
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));;
                    throw { message: errorData.error, status: res.status };
                }

                const data = await res.json();

                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setErrorMessage(err.message || "Une erreur s'est produite...");
                setErrorStatus(err.status);
                setLoading(false);
            }
        };

        getData();

        const interval = setInterval(getData, refreshTime);

        return () => {
            clearInterval(interval);
        }
    }, [refreshTime]);

    return { weatherData, loading, errorMessage, errorStatus };
}
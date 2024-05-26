import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css'
import Input from './components/Input/Input.tsx';
import Button from './components/Button/Button.tsx';
import Display from "./components/Display/Display.tsx";
import {WeatherData} from "./types.ts";

function App() {
    const OPENWEATHER_KEY = 'fe8bd993c5b572159d0eb6786ca0fd65';
    const RAPIDAPI_KEY = '01b82a69e0mshf14f35106a13f4ep1f3656jsnfc8ff3bbe987';

    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
                    headers: {
                        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com', 'x-rapidapi-key': RAPIDAPI_KEY,
                    },
                });
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchCities();
    }, []);

    const handleInputChange = (value: string) => {
        setCity(value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (<div className={'container'}>
        <div className={'input-container'}>
            <Input placeholder="Search city" value={city} onChange={handleInputChange}/>
            <Button onClick={handleSearch}>Search</Button>
        </div>
        {weatherData && <Display data={weatherData}/>}
    </div>);
}

export default App;

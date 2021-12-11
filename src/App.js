import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap';
import { getWeatherData } from './data/Weatherapi';
import { useState, useEffect } from 'react';

function App() {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState('Lahore');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try{
        const data = await getWeatherData(city);
        console.log(data)
        setWeatherData(data)
       
    }catch(error) {
      console.log(error.message);
      
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (

    
 
    <Container fluid>
      <Row>
        <Col >
    <div className='app'>
    <h2 className="title"><i class="fas fa-cloud image" ></i>Weather App</h2>
    
    <div className="search-form">
          <input onChange={(e)=>setCity(e.target.value)}placeholder="Enter your city name" type="text" />
          <button onClick={()=>getData()}type="button">Search</button>
        </div>
      { weatherdata!== null ? ( 
          <div className="main-container">
          <h4>Live Weather Condition</h4>
          <div className="weather-icon">
           <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}></img>
          </div >
          <h3>{weatherdata.weather[0].main}</h3>
          <div className='temperature'>
            <h1>{ parseFloat( weatherdata.main.temp - 273.15 ).toFixed(1) }&deg;C</h1>
          </div>
          <div className='location'>
            <h3><i class="fas fa-street-view"></i>{weatherdata.name} | {weatherdata.sys.country} </h3>
            </div>
          <div className='temp-range'>
          <h6>{parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)} &deg;C 
            || { parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}&deg;C 
            || {weatherdata.main.humidity}</h6>
          </div>
          </div>
      ) : null }
      
  
    
     
    </div>
    </Col>
    </Row>
    </Container>
    
  );
}

export default App;

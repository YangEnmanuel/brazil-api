import React, { useState } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl'
import axios from 'axios'

import './styles.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function AddressFinder() {
  const [cep, setCep] = useState('')
  const [cepIsValid, setCepIsValid] = useState(false)
  const [address, setAddress] = useState({})
  // Initial map view will focus on Brazil
  const [coordinates, setCoordinates] = useState({
    latitude: -14,
    longitude: -50,
    zoom: 3,
  })

  const validateCEP = (e) => {
    // The CEP must be 8 digits
    const isValid = /^[0-9]{8}$/g.test(e.target.value)

    isValid ? setCepIsValid(true) : setCepIsValid(false)
    setCep(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const res = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    setAddress(res.data)

    // Some CEPs doesn't have specific coordinates 
    if (Object.keys(res.data.location.coordinates).length === 0) {
      alert('The given CEP does not provides a registered street')
    } else {
      const { latitude, longitude } = res.data.location.coordinates
      setCoordinates({ latitude, longitude, zoom: 17 })
    }

    console.log(res.data)
  }

  return (
    <>
      <h1>CEP Finder</h1>
      <form action='get' onSubmit={submitHandler}>
        <input
          required
          type='text'
          name='cep'
          placeholder='Introduce a CEP'
          onChange={validateCEP}
          style={{ outline: 'none' }}
        />
        <button type='submit' disabled={cepIsValid ? false : true}>
          Search
        </button>
      </form>

      <div>
        {Object.keys(address).length === 0 ? (
          <p>Type a CEP!</p>
        ) : (
          <p>
            {address.street}, {address.neighborhood}, {address.city}
          </p>
        )}
      </div>

      <div className='mapWrapper'>
        <Map
          {...coordinates}
          onMove={(e) => setCoordinates(e.viewState)}
          mapboxAccessToken='pk.eyJ1IjoieWFuZ2VubWFudWVsIiwiYSI6ImNsYTg1YWdnMjAwZmszdm80NmV5cnU5YmoifQ.5rV6ex-488rO_XW8eWFujw'
          mapStyle='mapbox://styles/mapbox/streets-v9'
        >
          {/* If a valid CEP was submitted, draw a marker on the location */}
          {Object.keys(address).length === 0 ? null : (
            <Marker {...coordinates} anchor='bottom'></Marker>
          )}
          <NavigationControl />
        </Map>
      </div>
    </>
  )
}

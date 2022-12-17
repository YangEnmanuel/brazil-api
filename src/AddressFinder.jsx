import React, { useState } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl'
import axios from 'axios'

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
    <section className=''>
      <div className=''>
        <div
          className=' '
      style={{width: '500px', height: '500px'}}
       >
          <Map
            {...coordinates}
            onMove={(e) => setCoordinates(e.viewState)}
            mapboxAccessToken='pk.eyJ1IjoieWFuZ2VubWFudWVsIiwiYSI6ImNsYTg1YWdnMjAwZmszdm80NmV5cnU5YmoifQ.5rV6ex-488rO_XW8eWFujw'
            mapStyle='mapbox://styles/mapbox/streets-v9'
          >
            {Object.keys(address).length === 0 ? null : (
              <Marker {...coordinates} anchor='bottom'></Marker>
            )}
            <NavigationControl />
          </Map>
        </div>

        <div className=''>
          <h1 className=''>
            Address Finder
          </h1>
          <p className=''>
            Type a valid CEP number to know exactly the position in the map
            <br />
             Ex: 88117750
          </p>
          <form
            action='get'
            onSubmit={submitHandler}
            className=''
          >
            <div className=''>
              {/* <label htmlFor='cep' className='leading-7 text-sm text-gray-600'> Type a CEP </label> */}

              <input
                className=''
                required
                type='text'
                name='cep'
                placeholder='Introduce a CEP'
                onChange={validateCEP}
              />
            </div>
            <button
              type='submit'
              disabled={cepIsValid ? false : true}
              className=''
            >
              🔍
            </button>
          </form>

          {Object.keys(address).length === 0 ? (
            <p className=''>The address will apear here ....</p>
          ) : (
            <p className=''>
              {address.street ? address.street : '?'},
              {address.neighborhood ? address.neighborhood : '?'},{' '}
              {address.city}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

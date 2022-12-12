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
    <section className='text-gray-600 body-font'>
      <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
        <div
          className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0'
          style={{ width: '600px', height: '400px' }}
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

        <div className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
          <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
            Address Finder
          </h1>
          <p className='mb-8 leading-relaxed'>
            Type a valid CEP number to know exactly the position in the map
          </p>
          <form
            action='get'
            onSubmit={submitHandler}
            className='flex w-full md:justify-start justify-center items-end'
          >
            <div className='relative mr-4 lg:w-full xl:w-1/2 w-2/4'>
              {/* <label htmlFor='cep' className='leading-7 text-sm text-gray-600'> Type a CEP </label> */}

              <input
                className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
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
              className='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
            >
              Search
            </button>
          </form>

          {Object.keys(address).length === 0 ? (
            <p>Type a CEP!</p>
          ) : (
            <p className='mt-3'>
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

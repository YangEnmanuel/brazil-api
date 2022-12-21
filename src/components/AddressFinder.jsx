import React, { useState } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl'
import axios from 'axios'

import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

import 'mapbox-gl/dist/mapbox-gl.css'

export default function AddressFinder() {
  const [cep, setCep] = useState('')
  const [cepIsValid, setCepIsValid] = useState(false)
  const [address, setAddress] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  // Initial map view will focus on Brazil
  const [coordinates, setCoordinates] = useState({
    latitude: -14,
    longitude: -50,
    zoom: 3,
  })

  const validateCEP = (e) => {
    // The CEP must be 8 digits
    const isValid = /^[0-9]{5}-[0-9]{3}$/g.test(e.target.value)

    isValid ? setCepIsValid(true) : setCepIsValid(false)
    setCep(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
      setAddress(res.data)
      const { latitude, longitude } = res.data.location.coordinates
      setCoordinates({ latitude, longitude, zoom: 17 })
      setShowAlert(false)

    } catch (err) {
      setAddress({})
      setShowAlert(true)
      // Clearing the input 
      document.querySelector('.form').reset()
    }
  }

  return (
    <Container>
      <Row className='align-items-center p-5'>
        <Col style={{ width: '500px', height: '500px' }}>
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
        </Col>

        <Col className='p-5'>
          <h1>Address Finder</h1>

          <Form className='form' onSubmit={submitHandler}>
            <Form.Label className='pb-4'>
              Type a valid CEP number to know exactly the position in the map If
              you don't know what a CEP code is please check this{' '}
              <a href='https://en.wikipedia.org/wiki/C%C3%B3digo_de_Endere%C3%A7amento_Postal'>
                article
              </a>
             
            </Form.Label>
            <Row className='pb-4'>
              <Col>
                <Form.Control
                isInvalid={!cepIsValid}
                  required
                  type='text'
                  name='cep'
                  placeholder='Ex: #####-###'
                  onChange={validateCEP}
                />
              </Col>
              <Col>
                <Button
                  className='bg-white'
                  type='submit'
                  disabled={!cepIsValid}
                >
                  🔎
                </Button>
              </Col>
            </Row>
          </Form>

          {Object.keys(address).length === 0 ? (
            <p>The address will apear here ....</p> 
          ) : (
            <p>
              {address.street ? address.street : '?'},{' '}
              {address.neighborhood ? address.neighborhood : '?'},{' '}
              {address.city}
            </p>
          )}
          {showAlert ? <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          The given CEP does not exists 🤷‍♂️. Try again
        </p>
      </Alert> : null}
        </Col>  
      </Row>
    </Container>
  )
}

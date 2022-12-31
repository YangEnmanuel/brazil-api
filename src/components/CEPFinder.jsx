import React, { useState } from 'react'
import { findAddress } from 'cep-address-finder'
import { Container, Form, Button, Row, Col, Table, Card } from 'react-bootstrap'

export default function CEPFinder () {
  const [input, setInput] = useState({
    state: '',
    city: '',
    neighborhood: '',
    number: ''
  })
  const [possibleAddresses, setPossibleAddresses] = useState([])
  const [goodAddress, setGoodAddress] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { addresses, selectedAddress } = await findAddress(input)
    // console.log(selectedAddress, addresses)

    setGoodAddress(selectedAddress)
    setPossibleAddresses(addresses)
  }

  const handleChange = (e) => {
    if (e.target.name === 'state') setInput({ ...input, state: e.target.value })
    else if (e.target.name === 'city') setInput({ ...input, city: e.target.value })
    else if (e.target.name === 'street') setInput({ ...input, street: e.target.value })
    else if (e.target.name === 'neighborhood') setInput({ ...input, neighborhood: e.target.value })
    else if (e.target.name === 'number') setInput({ ...input, number: e.target.value })
  }

  return (
    <Container className='mt-0 mb-5 pb-5'>
      <Row className='p-5 mx-auto'>
        <Col lg={5} className='p-3 border shadow rounded text-center'>
          <h1 className='pb-5'>Don`t know your CEP ?</h1>

          <Form onSubmit={handleSubmit} className=''>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={3} htmlFor='state'>
                State:
              </Form.Label>
              <Col sm={9}>
                <Form.Select id='state' name='state' onChange={handleChange}>
                  <option value='AC'>Acre</option>
                  <option value='AL'>Alagoas</option>
                  <option value='AP'>Amapá</option>
                  <option value='AM'>Amazonas</option>
                  <option value='BA'>Bahia</option>
                  <option value='CE'>Ceará</option>
                  <option value='DF'>Distrito Federal</option>
                  <option value='ES'>Espírito Santo</option>
                  <option value='GO'>Goiás</option>
                  <option value='MA'>Maranhão</option>
                  <option value='MT'>Mato Grosso</option>
                  <option value='MS'>Mato Grosso do Sul</option>
                  <option value='MG'>Minas Gerais</option>
                  <option value='PA'>Pará</option>
                  <option value='PB'>Paraíba</option>
                  <option value='PR'>Paraná</option>
                  <option value='PE'>Pernambuco</option>
                  <option value='PI'>Piauí</option>
                  <option value='RJ'>Rio de Janeiro</option>
                  <option value='RN'>Rio Grande do Norte</option>
                  <option value='RS'>Rio Grande do Sul</option>
                  <option value='RO'>Rondônia</option>
                  <option value='RR'>Roraima</option>
                  <option value='SC'>Santa Catarina</option>
                  <option value='SP'>São Paulo</option>
                  <option value='SE'>Sergipe</option>
                  <option value='TO'>Tocantins</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={3} htmlFor='city'>
                City:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type='text'
                  name='city'
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={3} htmlFor='neighborhood'>
                Neighborhood
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type='text'
                  name='neighborhood'
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={3} htmlFor='street'>
                Street:{' '}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type='text'
                  name='street'
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={3} htmlFor='number'>
                Number
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type='number'
                  name='number'
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Button type='submit' size='lg'>
              Find my CEP
            </Button>
          </Form>
        </Col>

        <Col lg={6} className='mx-auto'>
          {possibleAddresses.length !== 0 &&
            <div>
              <Card
                className='rounded border-primary border mx-auto mb-3'
                style={{ fontSize: '.9rem' }}
              >
                <Card.Header className='bg-primary text-white'>
                  ✨ Best match:
                </Card.Header>
                <Card.Body className='p-0 m-0'>
                  <Table className='p-0 m-0'>
                    <thead>
                      <tr>
                        <th>CEP</th>
                        <th>Street</th>
                        <th>Neighborhood</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{goodAddress.cep}</td>
                        <td>{goodAddress.street}</td>
                        <td>{goodAddress.neighborhood}</td>
                        <td>{goodAddress.city}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              {possibleAddresses.length !== 1 &&
                <Card
                  className='rounded border-gray border mx-auto'
                  style={{ fontSize: '.9rem' }}
                >
                  <Card.Header className='bg-gray '>
                    🔎 Others similar:
                  </Card.Header>
                  <Card.Body className='p-0 m-0'>
                    <Table bordered hover className='m-0 p-0'>
                      <thead>
                        <tr>
                          <th scope='col'>CEP</th>
                          <th scope='col'>Street</th>
                          <th scope='col'>Neighborhood</th>
                          <th scope='col'>City</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/*  eslint-disable-next-line array-callback-return */}
                        {possibleAddresses.map((address, i) => {
                          if (!(i > 6)) {
                            return (
                              <tr key={i}>
                                <td scope='col'>{address.cep}</td>
                                <td scope='col'>{address.street}</td>
                                <td scope='col'>{address.neighborhood}</td>
                                <td scope='col'>{address.city}</td>
                              </tr>
                            )
                          }
                          console.log(address, i)
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              }
            </div>
          }
        </Col>
      </Row>
    </Container>
  )
}

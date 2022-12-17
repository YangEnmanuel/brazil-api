import { useState } from 'react'
import { findAddress } from 'cep-address-finder'

export default function CEPFinder() {
  const [input, setInput] = useState({
    state: '',
    city: '',
    neighborhood: '',
    number: '',
  })
  const [possibleAddresses, setPossibleAddresses] = useState([])
  const [goodAddress, setGoodAddress] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { addresses, selectedAddress } = await findAddress(input)
    console.log(selectedAddress, addresses)

    setGoodAddress(selectedAddress)
    setPossibleAddresses(addresses)
  }

  const handleChange = (e) => {
    if (e.target.name === 'state') setInput({ ...input, state: e.target.value })
    else if (e.target.name === 'city')
      setInput({ ...input, city: e.target.value })
    else if (e.target.name === 'street')
      setInput({ ...input, street: e.target.value })
    else if (e.target.name === 'neighborhood')
      setInput({ ...input, neighborhood: e.target.value })
    else if (e.target.name === 'number')
      setInput({ ...input, number: e.target.value })
  }

  return (
    <section className=''>
      <div className=''>
        <div className=''>
          <h1 className=''>Don't know your CEP ?</h1>

          <form onSubmit={handleSubmit} className=''>
            <div className=''>
              <label htmlFor='state'>State: </label>
              <select
                id='state'
                name='state'
                onChange={handleChange}
                className=''
              >
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
              </select>
            </div>

            <div className=''>
              <label htmlFor='city'>City: </label>
              <input
                type='text'
                name='city'
                onChange={handleChange}
                required
                className=''
              />
            </div>

            <div className=''>
              <label htmlFor='neighborhood'>Neighborhood</label>
              <input
                type='text'
                name='neighborhood'
                onChange={handleChange}
                required
                className=''
              />
            </div>

            <div className=''>
              <label htmlFor='street'>Street: </label>
              <input
                type='text'
                name='street'
                onChange={handleChange}
                required
                className=''
              />
            </div>

            <div className=''>
              <label htmlFor='number'>Number</label>
              <input
                type='number'
                name='number'
                onChange={handleChange}
                className=''
              />
            </div>

            <input type='submit' value='Find my CEP' className='' />
          </form>
        </div>

        {possibleAddresses.length === 0 ? (
          <div className='w-1/2'></div>
        ) : (
          <div className=''>
            <h2 className=''>✨ Best match:</h2>
            <p>CEP: {goodAddress.cep}</p>
            <p>Street: {goodAddress.street}</p>
            <p>Neighborhood: {goodAddress.neighborhood}</p>
            <p>City: {goodAddress.city}</p>

            {possibleAddresses.length === 1 ? (
              <p></p>
            ) : (
              <div className=''>
                <h3 className=''>🔎 Others similar:</h3>
                <table className=''>
                  <thead className=''>
                    <tr>
                      <th scope='col' className=''>
                        CEP
                      </th>
                      <th scope='col' className=''>
                        Street
                      </th>
                      <th scope='col' className=''>
                        Neighborhood
                      </th>
                      <th scope='col' className=''>
                        City
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {possibleAddresses.map((address, i) => {
                      if (i > 10) null
                      else
                        return (
                          <tr key={i} className=''>
                            <td scope='col' className=''>
                              {address.cep}
                            </td>
                            <td scope='col' className=''>
                              {address.street}
                            </td>
                            <td scope='col' className=''>
                              {address.neighborhood}
                            </td>
                            <td scope='col' className=''>
                              {address.city}
                            </td>
                          </tr>
                        )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

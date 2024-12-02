import { useState } from 'react'
import './App.css'
import ModalForm from './components/ModalForm'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import axios from 'axios'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add'){
      try{
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        consolace.log('client agregado:', response.data);
      } catch(error){
        console.error('Error al agregar cliente', error);
      }
      console.log('modal mode Add');
    } else {
      console.log('modal mode Edit');
      console.log('Actualizar client con ID: ', clientData.id);
      try{
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log('Cliente actualizado', response.data);
      }catch(error){
        console.error('Error al actualizar el cliente', error);
      }
    }
  }

  return (
    <>
    <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm}/>
    <TableList handleOpen={handleOpen} searchTerm={searchTerm}/>
    <ModalForm 
     isOpen={isOpen} OnSubmit={handleSubmit}
     onClose={() => setIsOpen(false)}
     mode = {modalMode} clientData={clientData} />
    </>
  )
}

export default App

import * as clientService from '../services/clientService.js';

// Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (err) {
    console.error('Error al obtener clientes:', err.message);
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
};

// Crear un cliente
export const addClient = async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.status(201).json(newClient);
  } catch (err) {
    console.error('Error al crear cliente:', err.message);
    res.status(500).json({ message: 'Error al crear el cliente' });
  }
};

// Actualizar un cliente
export const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const updatedClient = await clientService.updateClient(clientId, req.body);
    if (!updatedClient) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(updatedClient);
  } catch (err) {
    console.error('Error al actualizar cliente:', err.message);
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};

// Eliminar un cliente
export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deleted = await clientService.deleteClient(clientId);
    if (!deleted) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (err) {
    console.error('Error al eliminar cliente:', err.message);
    res.status(500).json({ message: 'Error al eliminar el cliente' });
  }
};

// Buscar clientes
export const searchClients = async (req, res) => {
  try {
    console.log("Parámetro recibido en la solicitud:", req.query);

    const { query } = req.query;
    if (!query || query.trim() === '') {
      console.log("Parámetro de búsqueda vacío");
      return res.status(400).json({ message: 'Parámetro de búsqueda requerido' });
    }

    const clients = await clientService.searchClients(query);

    if (clients.length === 0) {
      console.log(" No se encontraron clientes para la búsqueda:", query);
      return res.status(404).json({ message: 'No se encontraron clientes' });
    }

    console.log("Clientes encontrados:", clients);
    res.status(200).json(clients);
  } catch (err) {
    console.error('Error al buscar clientes:', err.message);
    res.status(500).json({ message: 'Error al buscar clientes' });
  }
};

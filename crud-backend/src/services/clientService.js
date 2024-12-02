import pool from '../db.js';

// Obtener todos los clientes
export const getAllClients = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM clients_tb');
    return rows;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw new Error('Error al obtener los clientes');
  }
};

// Crear un nuevo cliente
export const createClient = async (clientData) => {
  const { name, email, job, rate, isActive } = clientData;
  const [result] = await pool.query(
    'INSERT INTO clients_tb (name, email, job, rate, isActive) VALUES (?, ?, ?, ?, ?)',
    [name, email, job, rate, isActive]
  );
  return { id: result.insertId, ...clientData };
};

// Actualizar un cliente
export const updateClient = async (clientId, clientData) => {
  const { name, email, job, rate, isActive } = clientData;
  const [result] = await pool.query(
    `UPDATE clients_tb SET name = ?, email = ?, job = ?, rate = ?, isActive = ? WHERE id = ?`,
    [name, email, job, rate, isActive, clientId]
  );
  if (result.affectedRows === 0) return null;
  const [updatedClient] = await pool.query('SELECT * FROM clients_tb WHERE id = ?', [clientId]);
  return updatedClient[0];
};

// Eliminar un cliente
export const deleteClient = async (clientId) => {
  const [result] = await pool.query('DELETE FROM clients_tb WHERE id = ?', [clientId]);
  return result.affectedRows > 0;
};

// Buscar clientes por nombre o email
export const searchClients = async (query) => {
  try {
    console.log("Buscando clientes con query:", query);

    const [rows] = await pool.query(
      `SELECT * FROM clients_tb WHERE name LIKE ? OR email LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );

    console.log("Resultados encontrados:", rows);
    return rows;
  } catch (error) {
    console.error("Error al buscar clientes:", error);
    throw new Error('Error al buscar clientes');
  }
};

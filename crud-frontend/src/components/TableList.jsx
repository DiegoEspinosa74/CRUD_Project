import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TableList({handleOpen, searchTerm}){
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/clients');
                setTableData(response.data);
            } catch(err){
                setError(err.message);
            }
        };       fetchData();
    }, []);

    //Filtrar la tabla de datos en el buscador

    const filteredData = tableData.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Seguro que quieres eliminar el cliente?");
        if (confirmDelete){
            try{
                await axios.delete(`http://localhost:3000/api/clients/${id}`);
                setTableData((prevData) => prevData.filter(client => client.id !== id));
            } catch(err){
                setError(err.message);
            }
        }
    }

    return(
        <>
        
        <div className="overflow-x-auto mt-10">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th></th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Trabajo</th>
                <th>Rango</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody className="hover">
            {/* row 1 */}
            {filteredData.map((client) => (
                <tr key={client.id}>
                    <th>{client.id}</th>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.job}</td>
                    <td>{client.rate}</td>
                    <td>
                        <button className={`btn rounded-full w-20 ${client.isActive ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                            {client.isActive ? 'Active' : 'Inactive'}
                        </button>
                    </td>
                    <td>
                        <button onClick={() => handleOpen('edit', client)} className=" btn btn-secondary">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-accent" onClick={() => handleDelete(client.id)}>Delete</button>
                    </td>
                    {/*<td>{client.isactive}</td>*/}
                </tr>
            ))}
           

            </tbody>
        </table>
        </div>
     </>
    )
}

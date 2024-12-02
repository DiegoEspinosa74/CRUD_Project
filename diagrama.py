from graphviz import Digraph

# Crear el diagrama
diagram = Digraph(format='png', engine='dot')
diagram.attr(rankdir='TB', size='10')

# Frontend
diagram.node('Frontend', 'Frontend\n(React + TailwindCSS)', shape='box', style='filled', color='lightblue')
diagram.node('NavBar', 'NavBar.jsx', shape='ellipse', style='filled', color='lightgreen')
diagram.node('ModalForm', 'ModalForm.jsx', shape='ellipse', style='filled', color='lightgreen')
diagram.node('TableList', 'TableList.jsx', shape='ellipse', style='filled', color='lightgreen')

# Backend
diagram.node('Backend', 'Backend\n(Node.js + Express)', shape='box', style='filled', color='lightyellow')
diagram.node('Controller', 'Controladores\n(clientController.js)', shape='ellipse', style='filled', color='orange')
diagram.node('Routes', 'Rutas\n(clientRoute.js)', shape='ellipse', style='filled', color='orange')
diagram.node('Services', 'Servicios\n(clientService.js)', shape='ellipse', style='filled', color='orange')
diagram.node('DB_Conn', 'Conexión a BD\n(db.js)', shape='ellipse', style='filled', color='orange')

# Base de datos
diagram.node('Database', 'Base de Datos\n(MySQL - client_db)', shape='cylinder', style='filled', color='lightgrey')

# Conexiones
diagram.edge('Frontend', 'Backend', label='Llamadas API (HTTP Requests)')
diagram.edge('Backend', 'Database', label='Consultas SQL')
diagram.edge('Database', 'Backend', label='Resultados de consultas')
diagram.edge('Backend', 'Frontend', label='Respuestas JSON')

# Relación interna del frontend
diagram.edge('Frontend', 'NavBar', label='Componente de Interfaz')
diagram.edge('Frontend', 'ModalForm', label='Componente de Interfaz')
diagram.edge('Frontend', 'TableList', label='Componente de Interfaz')

# Relación interna del backend
diagram.edge('Backend', 'Controller', label='Gestiona la lógica')
diagram.edge('Controller', 'Routes', label='Define las rutas')
diagram.edge('Controller', 'Services', label='Llama a los servicios')
diagram.edge('Services', 'DB_Conn', label='Ejecuta consultas SQL')
diagram.edge('DB_Conn', 'Database', label='Conexión a la base de datos')

# Renderizar el diagrama
diagram.render('CRUD_Arquitectura', cleanup=True)

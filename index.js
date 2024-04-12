const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint para obtener el precio de una moneda
app.get('/coin/:coinName', async (req, res) => {
  const { coinName } = req.params;

  try {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);

    if (response.data.data) {
      const precio = response.data.data.priceUsd;
      res.send(`El precio en dólares de la moneda para el día de hoy es ${precio}`);
    } else {
      res.status(404).send('El nombre de la moneda no fue encontrado en la base de datos');
    }
  } catch (error) {
    console.error('Error al obtener el precio de la moneda:', error.message);
    res.status(500).send('El nombre de la moneda no fue encontrado en la base de datos');
  }
});

// Ruta raíz para mostrar "Hola, soy Michael Medina"
app.get('/', (req, res) => {
  res.send('Hola, soy Michael Medina');
});

// Nuevo endpoint para obtener la lista de usuarios
app.get('/users/:count', async (req, res) => {
  const { count } = req.params;
  const sort = req.query.sort || 'ASC';

  try {
    let users = [
      { nombreCompleto: "Acero Garcia Samuel" },
      { nombreCompleto: "Aljuri Martinez Darek" },
      { nombreCompleto: "Cepeda Uribe Juan Felipe" },
      { nombreCompleto: "Chaves Perez Ana Maria" },
      { nombreCompleto: "Cruz Pavas Carlos David" },
      { nombreCompleto: "Diaz Algarin Diego Norberto" },
      { nombreCompleto: "Diaz Bernal Jorge Esteban" },
      { nombreCompleto: "Diaz Vargas David Esteban" },
      { nombreCompleto: "Forero Peña Juan Jose" },
      { nombreCompleto: "Gutierrez De Piñeres Barbosa Santiago" },
      { nombreCompleto: "Lopez Huertas Samuel Esteban" },
      { nombreCompleto: "Medina Fernandez Michael Steven" },
      { nombreCompleto: "Moreno Carvajal Katherin Juliana" },
      { nombreCompleto: "Moreno Patarroyo Juan Pablo" },
      { nombreCompleto: "Muñoz Sendoya Nicolas Esteban" },
      { nombreCompleto: "Navarro Cuy Santiago" },
      { nombreCompleto: "Parrado Morales Juan Pablo" },
      { nombreCompleto: "Ramirez Chinchilla Daniel Santiago" },
      { nombreCompleto: "Restrepo Coca Juan Pablo" },
      { nombreCompleto: "Reyes Gonzalez Gabriela" },
      { nombreCompleto: "Rodriguez Falla Juan Jose" },
      { nombreCompleto: "Ruiz Torres Valentina" },
      { nombreCompleto: "Salas Gutierrez Mariana" },
      { nombreCompleto: "Sanchez Sandoval Sebastian" },
      { nombreCompleto: "Sarmiento Guarnizo Josue David" },
      { nombreCompleto: "Soler Prado Santiago" },
      { nombreCompleto: "Tamayo Lopez Maria Fernanda" },
      { nombreCompleto: "Urrea Lara Deivid Nicolas" },
      { nombreCompleto: "Azcona Andrés" }
    ];

    if (sort === 'DESC') {
      users.sort((a, b) => b.nombreCompleto.localeCompare(a.nombreCompleto));
    } else {
      users.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
    }

    const limitedUsers = users.slice(0, parseInt(count, 10));

    const formattedUsers = limitedUsers.map(user => user.nombreCompleto).join('\n');

    res.send(formattedUsers);
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error.message);
    res.status(500).send('Error al obtener la lista de usuarios');
  }
});

// Nuevo endpoint para simular la creación de un usuario
app.post('/users', (req, res) => {
  const { name, lastName, email, city = 'Bogotá', country = 'Colombia' } = req.body;

  if (!nombre || !apellido || !correo) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }

  const nuevoUsuario = {
    name,
    lastName,
    email,
    city,
    country
  };

  res.status(201).json(nuevoUsuario);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

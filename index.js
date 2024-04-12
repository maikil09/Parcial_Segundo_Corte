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

// Ruta raíz para mostrar "Hola, soy Michael"
app.get('/', (req, res) => {
  res.send('Hola, soy Michael Medina');
});

// Nuevo endpoint para obtener la lista de usuarios
app.get('/users/:count', async (req, res) => {
  const { count } = req.params;
  const sort = req.query.sort || 'ASC';

  try {
    let users = [
      // Lista de usuarios
    ];

    // Ordenar usuarios
    if (sort === 'DESC') {
      users.sort((a, b) => b.nombreCompleto.localeCompare(a.nombreCompleto));
    } else {
      users.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
    }

    // Limitar usuarios
    const limitedUsers = users.slice(0, parseInt(count, 10));

    // Formatear usuarios
    const formattedUsers = limitedUsers.map(user => user.nombreCompleto).join('\n');

    res.send(formattedUsers);
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error.message);
    res.status(500).send('Error al obtener la lista de usuarios');
  }
});

// Nuevo endpoint para simular la creación de un usuario
app.post('/users', (req, res) => {
  try {
    const { name, lastName, email, city = 'Bogotá', country = 'Colombia' } = req.body;

    if (!name || !lastName || !email) {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
    }

    const nuevoUsuario = {
      name,
      lastName,
      email,
      city,
      country
    };

    // Aquí podrías realizar la lógica necesaria para crear el usuario en tu base de datos

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear un usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

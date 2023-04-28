// Array de productos (simulando la respuesta de la API)
const stock = [
  {
    id: 1,
    name: 'Panel Solar 100W',
    image: 'https://example.com/images/panel_solar_100w.jpg',
    price: 99.99
  },
  {
    id: 2,
    name: 'Turbina Eólica 500W',
    image: 'https://example.com/images/turbina_eolica_500w.jpg',
    price: 299.99
  },
  {
    id: 3,
    name: 'Batería Solar 12V 100Ah',
    image: 'https://example.com/images/bateria_solar_12v_100ah.jpg',
    price: 149.99
  },
  {
    id: 4,
    name: 'Lámpara Solar LED',
    image: 'https://example.com/images/lampara_solar_led.jpg',
    price: 19.99
  },
  {
    id: 5,
    name: 'Controlador de Carga Solar',
    image: 'https://example.com/images/controlador_carga_solar.jpg',
    price: 39.99
  },
  {
    id: 6,
    name: 'Inversor de Corriente 1000W',
    image: 'https://example.com/images/inversor_corriente_1000w.jpg',
    price: 149.99
  },
  {
    id: 7,
    name: 'Lámpara Solar de Jardín',
    image: 'https://example.com/images/lampara_solar_jardin.jpg',
    price: 29.99
  },
  {
    id: 8,
    name: 'Panel Solar 200W',
    image: 'https://example.com/images/panel_solar_200w.jpg',
    price: 199.99
  },
  {
    id: 9,
    name: 'Batería Solar 12V 200Ah',
    image: 'https://example.com/images/bateria_solar_12v_200ah.jpg',
    price: 249.99
  },
  {
    id: 10,
    name: 'Turbina Eólica 1KW',
    image: 'https://example.com/images/turbina_eolica_1kw.jpg',
    price: 599.99
  },
  {
    id: 11,
    name: 'Inversor de Corriente 500W',
    image: 'https://example.com/images/inversor_corriente_500w.jpg',
    price: 99.99
  },
  {
    id: 12,
    name: 'Lámpara Solar Portátil',
    image: 'https://example.com/images/lampara_solar_portatil.jpg',
    price: 24.99
  },
  {
    id: 13,
    name: 'Panel Solar 300W',
    image: 'https://example.com/images/panel_solar_300w.jpg',
    price: 249.99
  },
  {
    id: 14,
    name: 'Turbina Eólica 2KW',
    image: 'https://example.com/images/turbina_eolica_2kw.jpg',
    price: 999.99
  },
  {
    id: 15,
    name: 'Controlador de Carga Solar MPPT',
    image: 'https://example.com/images/controlador_carga_solar_mppt.jpg',
    price: 79.99
  },
  {
    id: 16,
    name: 'Kit de Iluminación Solar para Exteriores',
    image: 'https://example.com/images/kit_iluminacion_solar_exteriores.jpg',
    price: 129.99
  },
  {
    id: 17,
    name: 'Lámpara Solar de Pared',
    image: 'https://example.com/images/lampara_solar_pared.jpg',
    price: 39.99
  },
  {
    id: 18,
    name: 'Panel Solar Flexible 50W',
    image: 'https://example.com/images/panel_solar_flexible_50w.jpg',
    price: 79.99
  },
  {
    id: 19,
    name: 'Turbina Eólica 3KW',
    image: 'https://example.com/images/turbina_eolica_3kw.jpg',
    price: 1499.99
  },
  {
    id: 20,
    name: 'Inversor de Corriente 2000W',
    image: 'https://example.com/images/inversor_corriente_2000w.jpg',
    price: 299.99
  },
  {
    id: 21,
    name: 'Batería Solar 12V 300Ah',
    image: 'https://example.com/images/bateria_solar_12v_300ah.jpg',
    price: 499.99
  },
  {
    id: 22,
    name: 'Lámpara Solar de Techo',
    image: 'https://example.com/images/lampara_solar_techo.jpg',
    price: 59.99
  },
  {
    id: 23,
    name: 'Panel Solar 400W',
    image: 'https://example.com/images/panel_solar_400w.jpg',
    price: 349.99
  },
  {
    id: 24,
    name: 'Controlador de Carga Solar PWM',
    image: 'https://example.com/images/controlador_carga_solar_pwm.jpg',
    price: 49.99
  },
  {
    id: 25,
    name: 'Inversor de Corriente 300W',
    image: 'https://example.com/images/inversor_corriente_300w.jpg',
    price: 79.99
  },
  {
    id: 26,
    name: 'Lámpara Solar de Mesa',
    image: 'https://example.com/images/lampara_solar_mesa.jpg',
    price: 34.99
  },
  {
    id: 27,
    name: 'Panel Solar 500W',
    image: 'https://example.com/images/panel_solar_500w.jpg',
    price: 449.99
  },
  {
    id: 28,
    name: 'Turbina Eólica 5KW',
    image: 'https://example.com/images/turbina_eolica_5kw.jpg',
    price: 2999.99
  },
  {
    id: 29,
    name: 'Kit de Panel Solar para Autocaravana',
    image: 'https://example.com/images/kit_panel_solar_autocaravana.jpg',
    price: 399.99
  },
  {
    id: 30,
    name: 'Estación de Carga Solar para Dispositivos Móviles',
    image: 'https://example.com/images/estacion_carga_solar_dispositivos_moviles.jpg',
    price: 89.99
  }

  ];
  
  // Simulación de la API de búsqueda
  function searchItems(query) {
    const filteredItems = stock.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    return filteredItems;
  }
  
  // Simulación de la API para obtener un producto por ID
  function getItemById(id) {
    const item = stock.find(item => item.id === id);
    return item;
  };
  
  export {stock,searchItems,getItemById};

  
# BackendCourse

**_Curso de Programacion Backend - [CODERHOUSE](https://www.coderhouse.com/)_**

## Desafio Entregable 12 - Tercera Entrega del Proyecto Final

Para la revision de este desafio debes ejecutar:

```
npm start
```

### Consigna

- Se profundizará sobre los roles de los usuarios, las autorizaciones y sobre la lógica de compra.

### Objetivos generales

Profesionalizar el servidor.

### Objetivos específicos

Aplicar una arquitectura profesional para nuestro servidor.
Aplicar prácticas como patrones de diseño, mailing, variables de entorno. etc.

### Se debe entregar

- Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.
- El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional)
- Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.
- Modificar la ruta /current Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria.
- Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:
  - Sólo el administrador puede crear, actualizar y eliminar productos.
  - Sólo el usuario puede enviar mensajes al chat.
  - Sólo el usuario puede agregar productos a su carrito.
- Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
  - Id (autogenerado por mongo)
  - code: String debe autogenerarse y ser único
  - purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
  - amount: Number, total de la compra.
  - purchaser: String, contendrá el correo del usuario asociado al carrito.
- Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.
  -La compra debe corroborar el stock del producto al momento de finalizarse
  - Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
  - Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.
  - Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
  - En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
- Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.

### Sugerencias

- Te recomendamos ver el vídeo explicativo disponible en la carpeta de clase

### Formato del entregable

- Link al repositorio de Github con el proyecto (sin node_modules)
- Además, archivo .env para poder correr el proyecto.

[comment]: <> (Este desafio pertenece a la clase 29 "Desarrollo de un servidor web basado en capas completo")

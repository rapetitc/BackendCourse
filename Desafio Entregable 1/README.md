# BackendCourse

**_Curso de Programacion Backend - [CODERHOUSE](https://www.coderhouse.com/)_**

## Desafio Entregable 1

Para la revision de este desafio debes ejecutar:

```
node ./ProductManager.js
```

### Consigna

- Realizar una clase “ProductManager” que gestione un conjunto de productos.

### Aspectos a incluir

- Debe crearse desde su constructor con el elemento _products_, el cual será un arreglo vacío.
- Cada producto que gestione debe contar con las propiedades:
  - title (nombre del producto)
  - description (descripción del producto)
  - price (precio)
  - thumbnail (ruta de imagen)
  - code (código identificador)
  - stock (número de piezas disponibles)
- Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
  - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
  - Al agregarlo, debe crearse con un id autoincrementable
- Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
- Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
  - En caso de no coincidir ningún id, mostrar en consola un error “Not found”

### Formato de entrega

- Archivo de Javascript listo para ejecutarse desde node.

[comment]: <> (Este desafio pertenece a la clase 2 "Nuevas funcionalidades de los lenguajes ECMAScritpt")

# BackendCourse

**_Curso de Programacion Backend - [CODERHOUSE](https://www.coderhouse.com/)_**

## Desafio Entregable 19 - Proyecto Final

Para la revision de este desafio solo debes ejecutar:

```
npm start
```

y para la revision online debes ir a [eCommerce Proyecto Online](http://url.com)

### Consigna

- Backend de una aplicación ecommerce

### Aspectos a incluir

- Desde el router de /api/users, crear tres rutas:
  - GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)
  - DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad
- Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce
- Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.
- Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.
- No es necesario desarrollar vistas para módulos que no influyan en el proceso de compra (Como vistas de usuarios premium para crear productos, o vistas de panel de admin para updates de productos, etc)
- Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.

### Objetivos generales

- Completar el proyecto final 

### Objetivos específicos

- Conseguir una experiencia de compra completa
- Cerrar detalles administrativos con los roles.

### Sugerencias

- Presta especial atención al template del Proyecto final. ¡Es crucial para alcanzar la nota que esperas!
- Debido a la complejidad de frontend requerida para poder aplicar una pasarela de pago, el PF no evalúa la pasarela de pago.

### Formato del entregable

- Link al repositorio de github sin node_modules
- Link del proyecto desplegado en la online

[comment]: <> (Este desafio pertenece a la clase 46 "Pasarelas de pago")

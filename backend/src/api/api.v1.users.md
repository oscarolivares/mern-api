# API USERS V1 - DOCS

## Descripción

_Esta API sirve para interactuar con el modelo de usuarios._

_URL de la API: <http://www.example.com/api/v1/users/>_

---

## Solicitudes disponibles:

### **1. Listar usuarios [GET]**

La lista de usurios se puede obtener mediante el método GET sobre la URL indicada en la sección anterior.

    GET: http://www.example.com/api/v1/users/

Esta solicitud retorna un Array de Objetos que contiene la lista de usuarios o un array vacio en caso de que no existan registros.

Ejemplo:

```
[
  {
    "_id": "5d42109cc4190e08fc33ce5d",
    "firstname": "John",
    "lastname": "Doe",
    "__v": 0
  },
  ...{}
]
```

### **2. Obtener un usuario [GET/:id]**

Para obtener un usuario se implementa en método GET y se indica el id del usuario en la url.

    GET: http://www.example.com/api/v1/users/{id}

Este solicitud retorna un objeto con la información del usuario correspondiente. O un "null" si no existe en la db.

Ejemplo:

```
{
  "_id": "5d42109cc4190e08fc33ce5d",
  "firstname": "John",
  "lastname": "Doe",
  "__v": 0
}
```

### **3. Crear un usuario [POST]**

Mediante el método POST se envía un JSON al servidor con el siguiente formato:

```
// POST: http://www.example.com/api/v1/users/

// body
{
  "firstname": "string",
  "lasttname": string"",
  "age": number,
}
```

**_Campos requeridos: firstname_**

En caso de éxito retornará el usuario creado.

### **4. Reemplazar o crear [PUT/:id]**

Esta solicitud permite, mediante un id suministrado en la URL, buscar y reemplazar por completo un determinado usuario y en caso de que no exista crearlo.

Tenga en cuenta que el único campo no reemplazable es "\_id". Si desea reemplazar también el \_id deberá eliminar por completo el usuario (DELETE/:id) e insertar uno nuevo (POST).

La url de la solicitud será de la siguiente manera:

    PUT: http://www.example.com/api/v1/users/:id

El cuerpo de la solicitud sigue la mismas directrices que el método para crear un usuario (POST), incluyendo los campos requeridos.

Respuestas:

- En caso de que el usuario se haya reamplazado con éxito la salida será algo como esto:

  ```
  {
      "n": 1,
      "nModified": 1,
      "ok": 1
  }
  ```

- En caso de que el usuario no exista y se cree uno nuevo en su lugar se obtendrá una respuesta con el siguiente formato:

  ```
  {
      "n": 1,
      "nModified": 0,
      "upserted": [
          {
              "index": 0,
              "_id": "5d433c3d0ae4c70df8e5e24e"
          }
      ],
      "ok": 1
  }
  ```

### **5. Actualizar un usuario [PATCH/:id]**

Con esta solicitud podremos actualizar cualquier campo de un determinado usuario.

La url se deberá contruir con el siguiente formato:

    PATCH: http://www.example.com/api/v1/users/:id

Ejemplo:

Dato el siguiente usuario:

```
{
  "_id": "5d42109cc4190e08fc33ce5d",
  "firstname": "John",
  "lastname": "Doe",
  "__v": 0
}
```

Digamos que queremos actualizar su campo "lastname" y cambiar de Doe a Travolta, haríamos la siguiente solicitud:

```
{
  "lastname": "Travolta",
}
```

Con lo que obtendríamos la siguiente respuesta:

```
{
    "_id": "5d42109cc4190e08fc33ce5d",
    "firstname": "John",
    "lastname": "Travolta",
    "__v": 0
}
```

_Cabe señalar que al igual que sucede con la solicitud Reemplazar cualquier intento de editar directamente el \_id será infructuoso._

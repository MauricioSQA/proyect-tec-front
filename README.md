# Desperdicio Cero 🍽️

## Introducción 📝

¡Bienvenido a Desperdicio Cero, una plataforma digital dedicada a la reducción del desperdicio de alimentos en restaurantes! Nuestra aplicación permite a los usuarios gestionar de manera eficiente y sostenible sus productos favoritos. Con Desperdicio Cero, no solo podrás disfrutar de una experiencia gastronómica más consciente, sino también contribuir activamente a la preservación del medio ambiente y la eficiencia operativa en la industria alimentaria.

## Tecnologías Utilizadas 🖥️

**Frontend:**
- Angular
 	Bootstrap
	AOS (Animate On Scroll)

**Backend:**
- Java
- Spring Boot:
	 Spring Security
	 Spring JPA
	 Lombock
	 Hibernate Envers
    
**Base de Datos:**
- MySQL

## Imagenes
![1](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/7a2ab483-8604-4ff4-875f-6efbe111eeb3)
![2](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/1576e941-433e-4a56-8c97-e81158d71a90)
![3](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/1c1e7f65-34c5-4ca1-98cb-79047377ff45)
![4](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/72c316f9-e539-48a1-a7a3-5b7a257e474e)
![5](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/246b8cc0-54df-4a63-ba1a-2339b40bb389)
![6](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/cee0df1a-4950-4277-8675-219a4400aac1)
![7](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/b6df48f6-caba-4b0d-a2a4-f07bfe1e42dc)
![8](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/3814228a-dc4a-44fa-ad45-e47894ac2b1e)
![9](https://github.com/LuisSalas94/desperdicio-cero-isil/assets/57297709/d4440b1d-7fe6-43e1-ba2f-99c129fe9bbe)

  
## Características Principales 🌟


### Gestión Eficiente de Datos:

- Integración con Spring Boot para un backend robusto y escalable.
- Almacenamiento de datos en MySQL para garantizar la persistencia y la escalabilidad.

### Autenticación y Seguridad:

- Autenticación segura con JWT.
- Gestión de sesiones y seguridad de datos.

### Tablas de Auditoria###
-Generación de Tablas de Auditoria para cada Entidad en la base de datos con Hibernate Envers

### Gestión de Usuarios:

-**CRUD completo para Usuarios** 

### Gestión de Empresas:

-**CRUD completo para Empresas** 

### Gestión de Productos:

- **CRUD completo para productos** 


### Interfaz de Usuario Atractiva:

- Diseño responsivo y atractivo con Bootstrap.
- Animaciones fluidas con AOS para una experiencia visual mejorada.

### Operaciones con Favoritos:

- Agregar y eliminar productos a la lista de favoritos.
- Funcionalidad intuitiva y fácil de usar.


### Confirmación de Recepción de Pedido###
-Funcionalidad desde el usuario para confirmar la recepción de un pedido






## Documentación de la API 📖

### Endpoints:

#### Empresas:

**GET /api/empresas:**
- Obtiene una lista de todas las empresas con soporte para ordenamiento y paginación.

**GET /api/empresas/{id}:**
- Obtiene información detallada sobre una empresa específica por su identificador.

**POST /api/empresas:**
- Crea una nueva empresa.
  - Método: `POST`
  - Endpoint: `/api/empresas`
  - Body: JSON con los datos de la empresa a crear.

**PUT /api/empresas/{id}:**
- Actualiza una empresa existente por su identificador.
  - Método: `PUT`
  - Endpoint: `/api/empresas/{id}`
  - Body: JSON con los datos actualizados de la empresa.

**DELETE /api/empresas/{id}:**
- Elimina una empresa por su identificador.
  - Método: `DELETE`
  - Endpoint: `/api/empresas/{id}`

#### Productos:

**GET /api/productos/empresa/{id}:**
- Obtiene una lista de todos los productos asociados a una empresa específica por su identificador.
  - Método: `GET`
  - Endpoint: `/api/productos/empresa/{id}`

**GET /api/productos/{id}:**
- Obtiene información detallada sobre un producto específico por su identificador.
  - Método: `GET`
  - Endpoint: `/api/productos/{id}`

**POST /api/productos:**
- Crea un nuevo producto.
  - Método: `POST`
  - Endpoint: `/api/productos`
  - Body: JSON con los datos del producto a crear.

**PUT /api/productos/{id}:**
- Actualiza un producto existente por su identificador.
  - Método: `PUT`
  - Endpoint: `/api/productos/{id}`
  - Body: JSON con los datos actualizados del producto.

**DELETE /api/productos/{id}:**
- Elimina un producto por su identificador.
  - Método: `DELETE`
  - Endpoint: `/api/productos/{id}`





### Ejemplo de Uso:

#### Crear una nueva empresa:
```http
POST /api/empresas
Content-Type: application/json

{
  "nombre": "Nombre de la Empresa",
  "descripcion": "Descripción de la empresa",
  "direccion": "Dirección de la empresa"
}
```
### Actualizar una empresa existente:
```http
PUT /api/empresas/{id}
Content-Type: application/json

{
  "nombre": "Nuevo Nombre",
  "descripcion": "Nueva descripción",
  "direccion": "Nueva dirección"
}
```
### Obtener todos los productos de una empresa específica:
```http
GET /api/productos/empresa/{id}
```





## Empezando 🚀

### Requisitos Previos:

- Node.js y npm instalados.
- Angular CLI.
- Java Development Kit (JDK) 8 o superior.
- MySQL Server.

### Configuración:

1. Clona este repositorio:

   ```bash
   https://github.com/LuisSalas94/desperdicio-cero-isil
   ```
2. Configura la base de datos MySQL y ajusta las credenciales en la configuración de Spring Boot.
	- En la Base de datos MySQL crear una base de 
 ### Ejecución  Backend:
- Navega a la carpeta springboot-backend.
- Construye la aplicación Spring Boot con Maven:
   ```bash
   $ ./mvnw clean package
   ```
- Ejecuta la aplicación Spring Boot:
  ```bash
   $ ./mvnw spring-boot:run
  ```
 ### Ejecución Frontend:
- Navega a la carpeta angular-frontend.
- Instala las dependencias:
 ```bash
   $ npm install
 ```
- Inicia el servidor de desarrollo de Angular:
 ```bash
   $ ng serve
 ```




### Accede a la Aplicación:
- Abre tu navegador y navega a http://localhost:4200 para disfrutar de Desperdicio Cero en acción.
- ¡Explora, gestiona y contribuye a Desperdicio Cero para una experiencia gastronómica más sostenible y eficiente! 🌍

## Autores 👤

- [Fernando Salas](https://github.com/LuisSalas94)
- [Mauricio](https://github.com)
- [Mirko](https://github.com)

## Contribuciones 🤝

¡Se agradecen las contribuciones, problemas y solicitudes de funciones!
Siéntete libre de revisar la [página de problemas](../../issues/).

## Muestra tu apoyo 🌟

¡Da una ⭐️ si te gusta este proyecto!

## Licencia 📝

Este proyecto tiene licencia [MIT](./MIT.md).




  

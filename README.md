# Meta Clock project using React, Spring and PostgreSQL

**View on GitHub Pages:** https://zabrafax.github.io/spring-react-meta-clock/  
*Note: The server may take a few minutes to start.*

![Preview](./assets/readme/meta-clock.gif)

## Meta Clock allows you to display time in an interesting and elegant way.

Inspired by [ *ClockClock 24* ](https://www.humanssince1982.com/en-eu/products/clockclock-24-white),
created with React, Spring, Java and PostgreSQL. Web-application have different options to try.
Once you find your perfect settings, you can display it on fullscreen. Have features like:

* Ability to choose custom theme colors
* Time zone selection
* Different clock grid variations
* Ability to create an account
* All settings are saved on the server when you are logged in
* Account sensitive data is saved in hashed form
* Auto authorization using tokens


## Deployment & Hosting

* Backend deployed on Render
* Frontend deployed automatically via GitHub Actions using Docker
* Database hosted on Supabase

### Note:
Due to free hosting, the server may take a couple of minutes to start.


## How to launch

### View on GitHub Pages:

https://zabrafax.github.io/spring-react-meta-clock/  
*Note: The server may take a few minutes to start.*

### Manual launch:

1. Clone the repository:
    ```bash
    git clone git@github.com:Zabrafax/spring-react-meta-clock.git
    cd spring-react-meta-clock
    ```
   
2. Backend setup:
    ```bash
    cd backend
    ```
   
   * Rename .env.example to .env:

   ```bash
    mv .env.example .env
    ```

   * Edit .env and provide your database connection details:
    
    ```ini
    SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/meta_clock_db
    SPRING_DATASOURCE_USERNAME=postgres
    SPRING_DATASOURCE_PASSWORD=postgres
    ```
    
   * Create the database meta_clock_db in PostgreSQL:
    
    ```sql
    CREATE DATABASE meta_clock_db;
    ```
    
   * Run the backend (Spring Boot):
      
    ```bash
    ./mvnw spring-boot:run
    ```

3. Frontend setup:
   ```bash
    cd frontend
    ```

   * Rename .env.example to .env:

   ```bash
    mv .env.example .env
    ```    

   * Install dependencies:
    
   ```bash
    npm install
    ```
    
   * Start the React app:
    
   ```bash
    npm start
    ```


## Technologies Used

* ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
  ![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
  ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
* ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?logo=spring&logoColor=white)
  ![Java](https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=white)
  ![Apache Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?logo=Apache%20Maven&logoColor=white)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
* ![WebSocket](https://img.shields.io/badge/WebSocket-008080?logo=websocket&logoColor=white)
  ![REST API](https://img.shields.io/badge/REST_API-61DAFB?logo=rest&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)


## Future Improvements

Adding different animations.

#### Created by [@Zabrafax](https://github.com/Zabrafax)
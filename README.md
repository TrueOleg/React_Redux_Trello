# React_Redux_Trello

Create a database using PGAdmin in which 3 tables:
  1. users which 5 column:
      1.1 id {PK, data type = bigserial, autoincrement}
      1.2 name (data type = character varying)
      1.3 avatar (data type = character varying)
      1.4 password (data type = character varying)
      1.5 email (data type = character varying)
  2. boards which 4 column:
      1.1 title (data type = character varying)
      1.2 user_id (data type = bigint)
      1.3 id {PK, data type = bigserial, autoincrement}
      1.4 secret (data type = character varying)
  3. tasks which 6 column:
      1.1 id {PK, data type = bigserial, autoincrement}
      1.2 board_id (data type = bigint)
      1.3 title (data type = character varying)
      1.4 content (data type = character varying)
      1.5 status (data type = character varying)
      1.6 position (data type = bigint)   

In server/config/config.js enter the data of the created database.

Open directory server in terminal.
Run the command "npm i" to set all dependencies.

Open directory client in terminal.
Run the command "npm i" to set all dependencies.

Open directory server in terminal.
Run the command "npm start" to start server.

Open directory client in terminal.
Run the command "npm start" to start client.
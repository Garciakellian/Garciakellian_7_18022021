****************Projet 7 - GARCIA Kellian - OpenClass Rooms******************************

Initialisation du projet :

**********************************1. CRÉATION DE LA BASE DE DONNÉE:****************************************************************************
  

  1. Connectez vous a Mysql avec vos identifiant.
  2. Pour crée la base de donnée, entrez le code suivant : CREATE DATABASE Groupomania;
  3. Pour utiliser la base de donnée, entrez le code suivant: USE groupomania;
  4. La base de donné possede 3 table ( user, messages, responses). Pour commencé, copier le code suivant pour la table user: 

		CREATE TABLE user  ( id int NOT NULL AUTO_INCREMENT, 
		email varchar(100) NOT NULL, 
		username  varchar(100) NOT NULL,
		password varchar(250) NOT NULL, 
		isAdmin tinyint NOT NULL DEFAULT 0 ,
		PRIMARY KEY (id),UNIQUE KEY id_UNIQUE (id),
		UNIQUE KEY email_UNIQUE (email),
		UNIQUE KEY username_UNIQUE (username))ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;



  5. Copier le code suivant pour la table messages :

		CREATE TABLE messages (idMESSAGES int AUTO_INCREMENT,
 		idUSERS int NOT NULL,
 		message text NOT NULL,
 		username varchar(100) NOT NULL,
 		created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
 		image varchar(255) NOT NULL,
 		PRIMARY KEY (idMESSAGES),
 		FOREIGN KEY (`idUSERS`) REFERENCES `user` (`id`) ON DELETE CASCADE)ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;
 

  6. copier le code suivant pour la table response : 

		CREATE TABLE responses (idRESPONSE int AUTO_INCREMENT,
		idMESSAGES int NOT NULL,
		idUSERS int NOT NULL, 
		response text NOT NULL,
		username varchar(100) NOT NULL,
		created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (idRESPONSE), 
		FOREIGN KEY (`idUSERS`) REFERENCES `user` (`id`) ON DELETE CASCADE)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

*********************************2. Backend:**************************************************************************************************************

 1. Crée un fichier .env dans la partie backend . Inserez (Pensez a modifier les * par vos information : 

		NAME = *******

		PASS = *******

		HOST = *******

		TOKEN = ******		

 2. Dans votre terminal, rendez vous dans la partie backend ( cd backend a partir du repo clonez)
 3. Lancer les commande suivante ( une fois la derniere commande executé, votre server est configuré et lancé ): 
	
		npm install
		npm install -g nodemon
		nodemon server

(Par defaut le serveur backend sera sur le port 3000)


*****************************3. Frontend*****************************************************************************************************************

 1. Dans un second terminal, rendez vous dans la partie frontend ( cd frontend depuis le repo clonez)
 2. lancer les commande suivane ( une fois la derniere commande executé, votre server frontend et configuré et lancé):
		
		npm install 
		npm run serve

(Par defaut le serveur frontend sera a l'adresse suivante :  http://localhost:8080/

****************************4. Création d'un compte admin***********************************************************************************************

  1. Apres avoir crée votre user sur l'application Groupomania, rendez vous dans votre client Mysql
  2. Connectez vous et rentrez la base de donnée avec le code suivante : USE Groupomania;
  3. Recupueré l'id de votre compte avec le code suivante : 
	
		Select id, username FROM user;

  4. Une fois recuperé, inserez le code pour designé votre compte admin ( en changant *votre id* par l'id obtenue a l'etape precedente):

		UPDATE user SET isAdmin = 1 WHERE id = *votre id* ;




 

		
		

 


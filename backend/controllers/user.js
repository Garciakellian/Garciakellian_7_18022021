const bcrypt = require('bcrypt'); // declaration de bcrypt
const jwt = require('jsonwebtoken');//declaration json web token
const db = require('../mysqlconfig');
const dotenv = require("dotenv");
dotenv.config({path: './.env'});
const TOKEN = process.env.TOKEN;

//création de compte (post)
exports.signup = (req, res, next) => {
    const user = req.body //recuperation du corps de la requete
     bcrypt.hash(user.password, 10) //hashage du mdp par bcrypt
    .then((hash) => {
        user.password = hash
        //insert l'user dans la base de donnée
        db.query(`INSERT INTO user SET ?`, user, (err, result, field) => {
            if (err) {
                console.log(err)
                return res.status(400).json("erreur")
            }
            return res.status(201).json({message : 'Votre compte a bien été crée !'},)
        });
    });
};

//connexion ( post)
exports.login = (req, res, next) => {
    const username = req.body.username
	  const password = req.body.password
	if (username && password) {
    //Selection dans la base de donné l'username donnée par l'user
      db.query('SELECT * FROM user WHERE username= ?', username, (error, results, _fields) => {
           if (results.length > 0) {
             //si la base de donné trouve l'user, bcrypt compare le mdp rentré a celui de la base de donné
            bcrypt.compare(password, results[0].password).then((valid) => {
              if (!valid) {
                res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
              } else {
                console.log(username, "s'est connecté")
                let status = ''
                if (results[0].isAdmin === 1) {
                  status = 'admin'
                } else {
                  status = 'membre'
                }
                res.status(200).json({//Atribue l'id, username, status et le token a l'utilisateur
                  userId: results[0].id,
                  username: results[0].username,
                  status: status,
                  token: jwt.sign({ userId: results[0].id, status: status },TOKEN,{ expiresIn: '24h' })
                })
              }
            })
          }
          else {
            res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
          }
        }
      )
    } else {
      res.status(500).json({ message: "Entrez votre email et votre mot de passe" })
    }
  }

  //suprimé user ( post)
exports.deleteUser = (req, res, next) => {
  db.query(
    //suprime l'user de la base de donné via son id
    'DELETE FROM user WHERE id= ?', req.body.userId, (error,result,field) => {
      if (error) {
        console.log(error)
        return res.status(400).json(error)
      }
      console.log('Le compte a bien été supprimé !')
      return res.status(200).json({ message: 'Votre compte a bien été supprimé !' })
      
    }
  )
}
//Affiche tout les user non admin(get)
exports.getUsers = (req, res, next) => {
  db.query(//Selection tout l'id, l'username, le status, et l'email des user non admin
    'SELECT id, username, isAdmin, email FROM user WHERE isAdmin=0',
    function (error, results) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json( results )
    }
  )
  }

  //affiche un user (get/id)
exports.getOneUser = (req, res, next) => {

  db.query(
    //selection dans la base de donné un user via son id
    'SELECT id, username, email FROM user WHERE id=?', req.params.id, (error, results) => {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json( results )
    }
  )

}

//met a jour un user(post)
exports.updateUser = (req, res, next) => {
  //recupere les donné necessaire dans le corps de la requete
  const email = req.body.email 
  const username = req.body.username
 const id = req.body.id
 let passwords = req.body.password
 bcrypt.hash(passwords, 10)  //hash le nouveau mdp
  .then((hash) => {
      passwords = hash
      console.log(req.params.userId)
    db.query(//met a jour la base de donné
      `UPDATE user SET email='${email}', username='${username}', password='${passwords}', isAdmin=${0}  WHERE id=${id}`, (error, results, fields) => {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ message: 'Vos information ont bien été modifié !' })
      }
       
    )

  });
};
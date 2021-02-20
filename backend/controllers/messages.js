const db = require('../mysqlconfig');//Configuration information de connections mysql
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const base64ImageToFile = require('base64image-to-file');

//posté un message(post)
exports.postmessage = (req, res, next) => {

    // declaration des constente
    const base64Image = req.body.image;
    const currentDate = Date.now();
    const userId = req.body.idUSERS;
    const fileName = userId + "-" + currentDate;
  
    //chemin et nom du fichier entrant
    base64ImageToFile(base64Image, 'tmp/', fileName, function(err) {
      if(err) {
        return console.error(err);
      }
      const bindings = {//cration du corp de requete pour la base de donnée
        message: req.body.message,
        idUSERS: req.body.idUSERS,
        username: req.body.username,
        // ...imageObject,
        image: fileName + '.gif',
      }
      const sqlQuery = "INSERT INTO `messages` SET ?"//insertion dans la base de donnée
      const preparedStatement = db.format(sqlQuery, [bindings])//requete preparé = insertion sql avec le corp de la requete
      db.query(preparedStatement, (error, result, field) => {
        if (error) {
          return res.status(400).json({ error })
        }
        return res.status(201).json({ message: 'Votre message a été postée ! '})
      })
    });
  };

  //Afficher un message (get/id)
exports.getoneMessage = (req, res, next) => {
 //Selection dans la base de donné via l'id du message
  db.query('SELECT * FROM messages WHERE idMESSAGES= ?', req.params.id, (error, result, field) => {
    if (error) {
      return res.status(400).json({ error })
    }

    return res.status(200).json(result)
  })

}

//modifier un message (post)
exports.updateMessage = (req, res, next) => {
  const message = req.body.message//extrait le message dans le corps de la requete
  const id = req.body.id//ainsi que l'id 
  console.log(message)
  console.log(id)
    db.query(//met a jour la base de donné avec les element extrait de la requete
      `UPDATE messages SET message='${message}' WHERE idMESSAGES=${id}`, (error, results, fields) => {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ message: 'Votre message a bien été modifié !' })
      }
       
    )

}

//repondre a un message ( post)
exports.responseMessage = (req, res, next) => {

  const reponse = {//extrait les element de la requete
    idMESSAGES: req.body.idMESSAGES,
    idUSERS: req.body.idUSERS,
    response: req.body.response,
    username: req.body.username
  }
  console.log(reponse);
// et les insert dans la basd de donnée 
  db.query(`INSERT INTO responses SET ?`, reponse, (error, result, field) => {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({ message: 'Votre réponse a été posté !' })

  })
}

//Afficher la reponse (get/id)
exports.getResponse = (req, res, next) => {
  //selection la reponse via son id dans la base de donné
  db.query('SELECT * FROM responses  WHERE idMESSAGES= ?', req.params.id, (error, result, field) => {
    if (error) {
      return res.status(400).json({ error })
    }

    return res.status(200).json(result)
  })

}

//suprimé un message ( post)
exports.deleteMessage = (req, res, next) => {
    db.query(//suprime un message de la base de donné via son id
      'DELETE FROM messages WHERE idMESSAGES= ?', req.body.id, (error, results, fields) => {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ message: 'Votre message a bien été supprimé !' })
      }
    )
  }

  //suprimé une reponse (post)
exports.deleteResponse = (req, res, next) => {
    db.query(//suprime une reponse de la base de donné via son id
      'DELETE FROM responses WHERE idRESPONSE= ?', req.body.id, (error, results, fields) => {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ message: 'Votre message a bien été supprimé !' })
      }
    )
  }

  //affiche les message ( get)
exports.getMessages = (req, res, next) => {
  //selectionne tout les message de la base de donné, et les affiche par ordre decroissant sur l'ordre de creation
db.query('SELECT * FROM messages  ORDER BY created_at DESC', (error, result, field) => {
    if (error) {
    return res.status(400).json({ error })
    }

    return res.status(200).json(result)
})

}

//affiche les reponse (get)
exports.getAllResponses = (req, res, next) => {
  //selectionne tout les reponse (pour le dash admin)
  db.query('SELECT * FROM responses', (error, result, field) => {
    if (error) {
      return res.status(400).json(error)
    }

    return res.status(200).json(result)
  })

}
  
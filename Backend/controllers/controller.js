const request = require('request');
const pool = require('../config/connect')
const session = require('express-session')
const queries = require('../config/queries')


module.exports = {
    createCliente: function(req, res) {
let email = req.body.email;
let firstname = req.body.firstname;
let lastname = req.body.lastname;
let website = "Isi";
let company = "ISi";
let phone = req.body.phone;
let rua = req.body.rua;
let cidade = req.body.cidade;
let estado = req.body.estado;
let zip = req.body.zip;


//2cea01fe-c720-43a4-97dd-d11bcde530d9
//2f61c28e-f4ef-4587-b8ab-cd6c94cc4ec2

let options = {
  'method': 'POST',
  'url': `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/`,
    qs: { hapikey: '2cea01fe-c720-43a4-97dd-d11bcde530d9' },
  'headers': {
    'Content-Type': 'application/json',
    'Cookie': '__cfduid=d520d7a241ebf1801b7c7f5361c2b3fce1619618102'
  },
  body: JSON.stringify({
    "properties": [
      {
        "property": "email",
        "value": email
      },
      {
        "property": "firstname",
        "value": firstname
      },
      {
        "property": "lastname",
        "value": lastname 
      },
      {
        "property": "website",
        "value": website
      },
      {
        "property": "company",
        "value": company
      },
      {
        "property": "phone",
        "value": phone
      },
      {
        "property": "address",
        "value": rua
      },
      {
        "property": "city",
        "value": cidade
      },
      {
        "property": "state",
        "value": estado
      },
      {
        "property": "zip",
        "value": zip
      }
    ]
  })

};
request(options, function (error, response) {
  if (error){
    console.log('erro'); 
  }
  else{
    console.log(response.body)
    res.status(200).send("sucesso")

  }  

});

},
login: function(req, res){   //npm install google-auth-library --save


    let token= req.body.token;
    let user = {};
    const {OAuth2Client} = require('google-auth-library');
    const CLIENT_ID = '934006643177-me65hrlepv1hdq7bcbq1kbia2hlut7oq.apps.googleusercontent.com'

    const client = new OAuth2Client(CLIENT_ID);

    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  //Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      user ={
      Primeiro_nome: payload.given_name,
      Ultimo_nome: payload.family_name,
      email:  payload.email,
      tipo: 1
      } 
      console.log(user)
      //console.log(payload)
      pool.query('SELECT Utilizador.Primeiro_nome, Utilizador.Ultimo_nome, Utilizador.email, Utilizador.tipo FROM Utilizador WHERE Utilizador.email=?', user.email, function (err, rows, fields){
        if(!err){
          if(rows.length==0){
            pool.query('INSERT INTO Utilizador SET ?', user, function(err, rows, fields){
              if (!err){
                res.status(200).json({error:null, response: rows}) 
              } else {res.status(400).json({error: err.code})
            console.log(err)}
            }
            )
          }
          else{
            res.status(200).json({error:null, response: rows})
          }
        }
        else{
          res.status(400)
          console.log(err)
        }
      })

    }
    verify()


},
criarProfessor: function(req, res){
  let token;
  console.log('a')
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const emailmoloni = process.env.EMAIL;
  const password = process.env.PASSWORD;
  let email = req.body.email;
  let name = req.body.firstname +" "+ req.body.lastname
  let nif = req.body.NIF;
  let rua = req.body.rua;
  let cidade =req.body.cidade;
  let zip = req.body.zip;
  
  let options = {
    'method': 'GET',
    'url': `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=${client_id}&client_secret=${client_secret}&username=${emailmoloni}&password=${password}`,
    'headers': {
      'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0'
    },
    json: true
  }
  request(options, function (error, response) {
    if (error){
         throw new Error(error);
    }
    else{
        token = response.body.access_token;
        //console.log(response.body)
        //console.log(token);
        if(!response.body.hasOwnProperty('error')){
            let options1 = {
            'method': 'POST',
            'url': `https://api.moloni.pt/v1/suppliers/insert/?access_token=${token}`,
            'headers': {
              'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0',
              "Content-Type": 'application/x-www-form-urlencoded'
            },
            'form': {
              'company_id': 176006,
              'vat': nif,
              'number': '20',
              'name': name,
              'language_id': '1',
              'address': rua,
              'zip_code': zip,
              'city': cidade,
              'country_id': 1,
              'email': email,
              'discount': 0,
              'credit_limit': 0,
              'qty_copies_document': 2,
              'maturity_date_id': 1100532,
              "payment_method_id": 1223263,
              'delivery_method_id': 1251179

            },
           json: true,
          }
          request(options1, function (error, response) {
            if (error){
              console.log('erro'); 
            }
            else{
              console.log(response.body)
              console.log('bem')
              if(response.body.valid==1){
                pool.query('UPDATE Utilizador SET Utilizador.tipo = 2 WHERE Utilizador.email= ?', email, function(err, rows, fields){
                  if(!err){
                    console.log('aa')
                    res.status(200).json({error:null, response: rows})
                  }
                  else{
                    res.status(400).json({error: err})
                  }
                })
              }
              else{
                console.log('erro2');
                res.status(400).json({
                  error: response.body
                })
              }
            }  
          })
        }
    }
  }) 
}
}
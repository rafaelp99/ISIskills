const request = require('request');
const db = require('../config/connect')
const session = require('express-session')



module.exports = {
    createCliente: function(req, res) {
let email = req.body.email;
let firstname = req.body.firstname;
let lastname = req.body.lastname;
let website = req.body.website;
let company = req.body.company;
let phone = req.body.phone;
let rua = req.body.rua;
let cidade = req.body.cidade;
let estado = req.body.estado;
let zip = req.body.zip;


//2cea01fe-c720-43a4-97dd-d11bcde530d9
//2f61c28e-f4ef-4587-b8ab-cd6c94cc4ec2

let options = {
  'method': 'POST',
  'url': 'https://api.hubapi.com/contacts/v1/contact/?hapikey=2cea01fe-c720-43a4-97dd-d11bcde530d9',
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
  if (error) res.send(error);  
  
  console.log(response.body);
  res.send(response.body);
});

},
login: function(req, res){


    let token= req.body.token;
    let user = {};
    const {OAuth2Client} = require('google-auth-library');
    const CLIENT_ID = '934006643177-me65hrlepv1hdq7bcbq1kbia2hlut7oq.apps.googleusercontent.com'

    const client = new OAuth2Client(CLIENT_ID);

    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      user ={"email":  payload.email,
      "nome": payload.name,
      "token": token
      } 
      console.log(payload)
    }
    verify()
    .then(()=>{ 
        res.cookie('session-token', token, ";path=/");
        res.send(user);
    })
    .catch(console.error);

}
}
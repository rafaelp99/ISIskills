const request = require('request');
const pool = require('../config/connect')
const session = require('express-session')
const queries = require('../config/queries')


module.exports = {
    createCliente: function(req, res) {
let email = req.body.email;
let firstname = req.body.firstname;
let lastname = req.body.lastname;
let NIF = req.body.NIF;
let website = "Isi";
let company = "ISi";
let phone = req.body.phone;
let rua = req.body.rua;
let cidade = req.body.cidade;
let estado = req.body.estado;
let zip = req.body.zip;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const emailmoloni = process.env.EMAIL;
const password = process.env.PASSWORD;
let token;


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

    //res.status(200).send("sucesso")
     
  let options1 = {
    'method': 'GET',
    'url': `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=${client_id}&client_secret=${client_secret}&username=${emailmoloni}&password=${password}`,
    'headers': {
      'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0'
    },
    json: true
  }
  request(options1, function (error, response) {
    if (error){
         throw new Error(error);
    }
    else{
        token = response.body.access_token;
        
        //console.log(token);
        if(!response.body.hasOwnProperty('error')){
            let options2 = {
            'method': 'POST',
            'url': `https://api.moloni.pt/v1/customers/getByEmail/?access_token=${token}`,
            'headers': {
              'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0',
              "Content-Type": 'application/x-www-form-urlencoded'
            },
            'form': {
              'company_id': 176006,
               'email': email

            },
           json: true,
          }
          request(options2, function(error, response){
            if (error){
              throw new Error(error);
         }
         else{
          console.log(response.body.length)
           if(response.body.length == 0){
              let options3 = {
                'method': 'POST',
                'url': `https://api.moloni.pt/v1/customers/insert/?access_token=${token}`,
            'headers': {
              'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0',
              "Content-Type": 'application/x-www-form-urlencoded'
            },
            'form': {
              'company_id': 176006,
              'VAT': NIF,
              'number': email,
              'name': firstname + " " + lastname,
              'language_id': 1,
              'address': rua,
              'city': cidade,
              'country_id': 1,
               'email': email,
              'maturity_date_id': 1100532,
              'copies': {
                'document_type_id': 1,
                'copies': 1
              },
              "payment_method_id": 1223263,
              'delivery_method_id': 1251179,
              'salesman_id': null,
              'payment_day': null,
              'discount': null,
              'credit_limit': null

            },
           json: true,
              }
              request(options3, function(error, response){
                if (error){
                  throw new Error(error);
             }
             else{
              if(response.body.valid==1){
                res.status(200).send('sucesso criado')
              }
              else{
                console.log(response.body)
                res.status(400).send(response.body)
              }
             }
              })
           }
           else if(response.body.length > 0){
             res.status(200).send('sucesso atualizado')
           }
         }
          })
  }  

      };

    })
  }
})
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
            'url': `https://api.moloni.pt/v1/salesmen/insert/?access_token=${token}`,
            'headers': {
              'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0',
              "Content-Type": 'application/x-www-form-urlencoded'
            },
            'form': {
              'company_id': 176006,
              'vat': nif,
              'number': email,
              'name': name,
              'base_commission': 10,
              'language_id': 1,
              'address': rua,
              'zip_code': zip,
              'city': cidade,
              'country_id': 1,
              'email': email,            
              'qty_copies_document': 2,
              
              

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
},
criarCurso: function(req, res){
  let token;
  
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const emailmoloni = process.env.EMAIL;
  const password = process.env.PASSWORD;
  let name = req.body.nome;
  let resumo = req.body.resumo;
  let email = req.body.email;
  let count;
  let numero;
  
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
        if(!response.body.hasOwnProperty('error')){
          let options1 = {
            'method': 'POST',
            'url': `https://api.moloni.pt/v1/products/count/?access_token=${token}`,
            'headers': {
              'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0',
              "Content-Type": 'application/x-www-form-urlencoded'
            },
            'form': {
              'company_id': 176006,
              'category_id': 3586680,
            },
           json: true,
          }
          request(options1, function (error, response) {
            if (error){
              console.log('erro'); 
            }
            else{
              count = response.body.count;
              request.post({                          
              headers: {'content-type' : 'application/x-www-form-urlencoded'},
              url:`https://api.moloni.pt/v1/salesmen/getByNumber/?access_token=${token}`,
              form:{ company_id: '176006',
                    number : email}
                  }, function(error, response, body){
                    if(error){
                      res.send(error)
                    }
                    else if(JSON.parse(body).length>0){
                      console.log(JSON.parse(body)[0].salesman_id)
                      numero = JSON.parse(body)[0].salesman_id
                      let options2 = {
                        'method': 'POST',
                        'url': `https://api.moloni.pt/v1/products/insert/?access_token=${token}`,
                        'headers': {
                          'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0',
                          "Content-Type": 'application/x-www-form-urlencoded'
                        },
                        'form': {
                          'company_id': 176006,
                          'category_id': 3586680,
                          'type': 2,
                          'name': name,
                          'summary': resumo,
                          'reference': numero+'@'+count,
                          'price': 10,              
                          'unit_id': 1531137,
                          'has_stock': 0,
                          'stock': false,
                          'exemption_reason': 'M01',
                          'taxes': {
                            'tax_id': 2171224,
                            'value': 23,
                            'order': 1,
                            'cumulative': 0
                          }
                        },
                       json: true,
                      }
                      request(options2, function (error, response) {
                        if (error){
                          console.log('erro'); 
                        }
                        else{
                          console.log(response.body)
                          console.log('bem')
                          if(response.body.valid==1){
                            res.status(200).json({errors: "null"})
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
                    else{
                      console.log(body)
                      res.status(400).send('erro')
                    }
                  })

            }
          }
          )}
    }
  })
},

getCursos: function(req, res){
  let token;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const emailmoloni = process.env.EMAIL;
  const password = process.env.PASSWORD;
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
      request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:    `https://api.moloni.pt/v1/products/getAll/?access_token=${token}`,
        form:    { company_id: '176006', category_id: '3586680'}  
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            
            res.send(JSON.parse(body));
    }
});
    }
  })
},
getCursoId: function(req, res){
  let token;
  console.log(req.params)
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const emailmoloni = process.env.EMAIL;
  const password = process.env.PASSWORD;
  let idcurso = req.params.id;
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
      request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:    `https://api.moloni.pt/v1/products/getOne/?access_token=${token}`,
        form:    { company_id: '176006', product_id: idcurso}  
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
         console.log(idcurso)
          console.log(JSON.parse(body))
            res.send(JSON.parse(body));
    }
});
    }
  })
},
criarCompra: function(req,res){
  let token;
  console.log(req.params)
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const emailmoloni = process.env.EMAIL;
  const password = process.env.PASSWORD;
  let idcurso = req.body.idCurso;
  let curso;
  let idProf = req.body.idProf;
  let emailM = req.body.email;
  let expdate = req.body.expdate;
  let idCliente;
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
      request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:    `https://api.moloni.pt/v1/customers/getByEmail/?access_token=${token}`,
        form:    { company_id: '176006', email: emailM}
      }, function(error, response, body){
        if(error){
          console.log(error);
          res.send(error);
        }
        else{
          
          if(JSON.parse(body).length > 0){
             idCliente = JSON.parse(body)[0].customer_id
            console.log(JSON.parse(body)[0].customer_id)
             var options = { method: 'GET',
             url: `https://api.hubapi.com/contacts/v1/contact/email/${emailM}/profile`,
             qs: { hapikey: '2cea01fe-c720-43a4-97dd-d11bcde530d9' },}

              request(options, function (error, response, body) {
              if (error) throw new Error(error);
              else{
                if(body.length>0){
                  request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url:    `https://api.moloni.pt/v1/products/getOne/?access_token=${token}`,
                    form:    { company_id: '176006', product_id: idcurso}  
                }, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    else {
                        curso = JSON.parse(body);
                        request.post({
                          headers: {'content-type' : 'application/x-www-form-urlencoded'},
                          url:`https://api.moloni.pt/v1/invoices/insert/?access_token=${token}`,
                          form:{ company_id: '176006',
                                maturity_date_id: '1100532',
                                document_set_id: '392293',
                                customer_id: idCliente,
                                associated_documents: {}, 
                                products: [{'product_id': idcurso, 'qty': 1, 'price': curso.price, 'name': curso.name, exemption_reason: 'M01'}],
                                salesman_id: idProf,
                                date: new Date().toISOString().slice(0, 10),
                                expiration_date: expdate,
                                qty: '1',
                                status: '1'}
                        }, function(error, response, body){
                          if(error){
                            console.log(error)
                            res.send(error)
                          }
                          else{
                            if(JSON.parse(body).valid){
                            res.status(200).send('fatura criada')
                          }
                          else{
                            console.log(JSON.parse(body))
                            res.status(400).send('erro')
                          }
                          }
                        })
                }
            });
                }
                else{

                  res.status(400).json({error: 'Não tem o registo completo'})
                }
              }
              });
          }
          else{
            res.status(400).json({error: 'Não tem o registo completo'})
          }
        } 
      })

    }
  })
},
mostrarCompra: function(req,res){
  let email;
  let token;
  let options = {
    'method': 'GET',
    'url': `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=${client_id}&client_secret=${client_secret}&username=${emailmoloni}&password=${password}`,
    'headers': {
      'Cookie': 'PHPSESSID=0190phbrorfjpurpcu4ne5fbe0'
    },
    json: true
  }
  request(options, function (error, response){
    if (error){
      throw new Error(error);
 }
 else{
   
   token = response.body.access_token;

   
 }
  })
}

}
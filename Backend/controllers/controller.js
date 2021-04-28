const request = require('request');
module.exports = {
    createCliente: function(req, res) {
let email = req.body.email;
let firstname = firstname;
let lastname = lastname;
let website = website;
let company = company;
let phone = phone;
let rua = rua;
let cidade = cidade;
let estado = estado;
let zip = zip;





let options = {
  'method': 'POST',
  'url': 'https://api.hubapi.com/contacts/v1/contact/?hapikey=2f61c28e-f4ef-4587-b8ab-cd6c94cc4ec2',
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
        "value": "SportsCo"
      },
      {
        "property": "phone",
        "value": "555-122-2424"
      },
      {
        "property": "address",
        "value": "20 First Street"
      },
      {
        "property": "city",
        "value": "London"
      },
      {
        "property": "state",
        "value": "LN"
      },
      {
        "property": "zip",
        "value": "02240"
      }
    ]
  })

};
request(options, function (error, response) {
  if (error) res.send(error);  
  
  console.log(response.body);
  res.send(response.body);
});

}
}
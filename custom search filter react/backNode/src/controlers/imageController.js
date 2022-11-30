const FormData = require("form-data");
const axios = require("axios");
const { faker } = require('@faker-js/faker');

class generateDataController {
  static createCompany(id) {
    let name = faker.company.name();
    let description = faker.company.catchPhraseDescriptor();
    let founded = faker.date
      .between("2018-01-01", "2018-07-31")
      .toISOString()
      .split("T")[0];
    let headCount = faker.random.numeric();
    let phone = faker.phone.number();
    let email = faker.internet.email(name.toLowerCase(), "", "protonmail.com");
    let website = faker.internet.url();
    let linkedinUrl =
      faker.internet.protocol() +
      "linkedin.com" +
      faker.internet.domainSuffix();
    let linkedinEmployees = faker.random.numeric();
    let industry = faker.commerce.department();
    let subIndustry = faker.commerce.department();
    let country = faker.address.country();
    let status = faker.helpers.arrayElement(["verified", "lead", "contact"]);
   
   

    return {
      id: id,
      name: name,
      // description: description,
      // dateEstablished: founded,
      phone: phone,
      email: email,
      website: website,
      // linkedinUrl: linkedinUrl,
      // linkedinEmployees: linkedinEmployees,
      country: country,
      status: status,
      headCount: headCount,
      industry: industry,
      // subIndustry: subIndustry,
    };
  }

  static createUser(id) {
    let priority = faker.datatype.number({min: 1, max: 2});
    let date = faker.date.between("2018-01-01", "2018-07-31").toISOString().split("T")[0];
    let fromId = faker.datatype.number({min: 1000, max: 9999})
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let name = `${firstName} ${lastName}`
    let username = faker.internet.userName(firstName.toLowerCase(), lastName.toLowerCase())
    let phone = faker.phone.number();
    let email = faker.internet.email(firstName.toLowerCase(), lastName.toLowerCase(), 'protonmail.com')
    let website = faker.internet.url()
    let address = {
        street: faker.address.streetAddress(),
        suite: faker.address.streetAddress(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode(),
    }
    let status = faker.helpers.arrayElement(['verified', 'lead', 'contact']);
    return {
        "id": id,
        "name": name,
        "username": username,
        "from_userId": fromId,
        "date_sent": date,
        "priority": priority,
        "phone": phone,
        "email": email,
        "website": website,
        "address": address,
        "status": status,
    };
}
  static createUsers = async (request, response) => {
    const users = [];
    for (let id = 0; id < 100; id++) {
      let user = createUser(id);
      users.push(user);
    }
    return users;
  };

  static createCompanies = async (request, response) => {
    const companies = [];
    for (let id = 0; id < 10; id++) {
      companies.push(this.createCompany(id));
    }
    if(companies.length > 0){
      response.send({
        companies
      })
    }
  };
}

module.exports = generateDataController;

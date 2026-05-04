const express = require("express");
const router = express.Router();

const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

router.post("/", async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    console.log("email: ", email)
    let apiInstance = new SibApiV3Sdk.ContactsApi();
    let createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.listIds = [13];
    createContact.updateEnabled = true;

    apiInstance.createContact(createContact).then(
      function (data) {
        console.log(data)
        return res.status(200).send(true);
      },
      function (error) {
        console.log(error)
        return res.status(500).send(error.message);
      }
    );
  } else {
    res.status(422).send("data_incomplete");
  }
});

module.exports = router;

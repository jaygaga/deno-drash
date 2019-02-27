import members from "../../members.ts";

let server = new members.Drash.Http.Server({});
let request = members.mockRequest("/", "get", {
  headers: {
    "Response-Content-Type-Default": "application/json"
  }
});

let response = new members.Drash.Http.Response(request);
response.body = "This is my body";
let responseFormatted;

members.test(async function Response_generateResponse_json_default() {
  members.assert.equal(
    response.generateResponse(),
    `{"status_code":200,"status_message":"OK","request":{"url":"/","method":"GET"},"body":"This is my body"}`
  );
});

members.test(async function Response_generateResponse_html() {
  response.headers.set("Content-Type", "text/html");
  responseFormatted = response.generateResponse();
  members.assert.equal(
    responseFormatted,
    `<!DOCTYPE html>
<head>
  <style>
    html { font-family: Arial }
  </style>
</head>
<body>
  <h1>200 (OK)</h1>
  <p>This is my body</p>
</body>
</html>`
  );
});

members.test(async function Response_generateResponse_xml() {
  response.headers.set("Content-Type", "text/xml");
  responseFormatted = response.generateResponse();
  members.assert.equal(
    responseFormatted,
    `<response>
  <statuscode>200</statuscode>
  <statusmessage>OK</statusmessage>
  <body>This is my body</body>
</response>`
  );
  response.headers.set("Content-Type", "application/xml");
  responseFormatted = response.generateResponse();
  members.assert.equal(
    responseFormatted,
    `<response>
  <statuscode>200</statuscode>
  <statusmessage>OK</statusmessage>
  <body>This is my body</body>
</response>`
  );
});

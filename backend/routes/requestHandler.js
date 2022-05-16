const path = require("path");
const fs = require("fs");
const funcs = {};
const { validationResult } = require("express-validator");
let validators = {};

funcs.handlerequest = (func) => async (req, res, next) => {
  const base = req.baseUrl.split("/")[3].toString();
  let pathname = req._parsedUrl.pathname.toString();
  const method = req.method.toLowerCase().toString();
  if(base==='video' && method=='get'){
    pathname='/videoid';
  }
  try {
    console.log(path.join(__dirname, "..", `${base}/validators.js`));
    //check if the validators object for the current base already exists
    if (!validators[base]) {
      //check if the validators for the current endpoint base have beeen made
      if (
        fs.existsSync(
          path.join(__dirname, "..", "utils", "validators", `${base}.js`)
        )
      ) {
        
        validators[base] = require(path.join(
          __dirname,
          "..",
          "utils",
          "validators",
          `${base}.js`
        ));
        
      }
    }
   
    //check if validators for the endpoint exists
    if (
      !(
        validators &&
        validators[base] &&
        validators[base][method] &&
        validators[base][method][pathname]
      )
    )
      throw {
        msg:
          `No schema found for ${pathname} of ${method} protocol of ${base} route file.` +
          ` A route ${pathname} has to be declared in utils/validators/${base}.js for ` +
          `${method} protocol`,
        location: path.basename(__filename),
        status: 400
      };
    //Validating the request
    await Promise.all(
      validators[base][method][pathname].map((validation) =>
        validation.run(req)
      )
    );
    //throw errors for the validation err;
    validationResult(req).throw();
    await func(req, res);
  } catch (err) {
    // if validator has thrown an error set the status of the error to 400
    if (err.errors && err.errors.length) {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500).json({ message: (err.errors && err.errors[0].msg) || (err.message || err.msg) || err });
  }
};

module.exports = funcs;

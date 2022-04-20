const path = require("path");
const fs = require("fs");
const funcs = {};
const { validationResult } = require("express-validator");
let validators = {};

funcs.handlerequest = (func) => async (req, res, next) => {
  const base = req.baseUrl.split("/")[3].toString();
  const pathname = req._parsedUrl.pathname.toString();
  console.log(base);
  const method = req.method.toLowerCase().toString();
  
  try {
    console.log(path.join(__dirname, "..", `${base}/validators.js`));
    if (!validators[base]) {
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
          ` A route ${endPointName} has to be declared in utils/validators/${base}.js for ` +
          `${protocolName} protocol`,
        location: path.basename(__filename),
        status: config.get("httpStatusCodes.badRequest"),
      };
    //Validating the request
    await Promise.all(
      validators[base][method][pathname].map((validation) =>
        validation.run(req)
      )
    );
    validationResult(req).throw();
    await func(req, res);
  } catch (err) {
    // if validator has thrown an error set the status of the error to 400
    if (err.errors && err.errors.length) {
      err.status = 400;
    }

    res.status(err.status || 500).json({ message: err.errors[0].msg || err });
  }
};

module.exports = funcs;

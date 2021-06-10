const jwt = require("jsonwebtoken");

const authentication = async (ctx, next) => {
  let token=ctx.request.body.token;
  //let token = ctx.headers.authorization.split(" ")[1];
  await jwt.verify(token, process.env.SECRET_TOKEN, async (error, user) => {
    if (error) {
      ctx.status = 401;
      ctx.message = "Unauthorized";
    } else {
      ctx.user = user;
      await next();
    }
  });
};

module.exports = authentication;

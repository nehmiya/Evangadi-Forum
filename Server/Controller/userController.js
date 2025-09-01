const landing = (req, res) => {
  res.send("<h1>The server is up and running...</h1>");
}


const register = (req, res) => {
  res.send("Register User");
}

const login = (req, res) => {
  res.send("Login User");
};

const check = (req, res) => {
  res.send("Check User");
};

module.exports = {landing,register,login,check}

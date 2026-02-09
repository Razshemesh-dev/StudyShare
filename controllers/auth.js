const Users = require("../models/Users");
const bcrypt = require("bcryptjs");

exports.saveUser = async (req, res) => {
  const {
    full_name,
    email,
    username,
    password,
    education_institute,
  } = req.body;

  if (!full_name || !email || !username || !password) {
    return res.render("auth/register", {
      error: "יש למלא את כל השדות הנדרשים",
      registrationSuccess: false,
    });
  }

  try {
    const [existingUser] = await Users.fetchByUsername(username);
    if (existingUser.length > 0) {
      return res.render("auth/register", {
        error: "שם המשתמש כבר קיים במערכת",
        registrationSuccess: false,
      });
    }

    const [existingEmail] = await Users.fetchByEmail(email);
    if (existingEmail.length > 0) {
      return res.render("auth/register", {
        error: "דוא״ל זה כבר משויך לחשבון",
        registrationSuccess: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Users(
      username,
      email,
      full_name,
      hashedPassword,
      education_institute || null,
      "student"
    );
    const [result] = await newUser.save();

    // Auto-login after successful registration
    req.session.isLoggedIn = true;
    req.session.userId = result.insertId;
    req.session.userName = full_name;

    return res.redirect("/profile");
  } catch (err) {
    console.error(err);
    return res.status(500).send("שגיאה בשרת");
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("auth/login", { error: "יש למלא שם משתמש וסיסמה" });
  }

  try {
    const [rows] = await Users.fetchByUsername(username);
    const dbUser = rows[0];

    if (!dbUser) {
      return res.render("auth/login", { error: "שם משתמש או סיסמה שגויים" });
    }

    const match = await bcrypt.compare(password, dbUser.password);
    if (!match) {
      return res.render("auth/login", { error: "שם משתמש או סיסמה שגויים" });
    }

    req.session.isLoggedIn = true;
    req.session.userId = dbUser.id;
    req.session.userName = dbUser.full_name;
    
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("שגיאה בשרת");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};

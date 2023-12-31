import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import {
  hashPassword,
  validatePassword,
  hashString,
} from "../../utils/hash.js";
import {
  mailOptions,
  sendEmail,
  generateUserVerificationHtml,
  generateUserForgotPasswordHtml,
} from "../../utils/mailer.js";
import {
  findUser,
  findUserEmail,
  createUserAccount,
  createUser,
  getAccountVerified,
  verifyAccount,
  setUserCode,
  checkUserCode,
  checkIfUserCodeExpired,
  resetUserCodeAndExpires,
  resetUserPassword,
} from "../../queries/user/user-queries.js";
import { CheckDate, signupValidation } from "../../utils/helper.js";

import express from "express";

let router = express.Router();

router.post(
  "/api/v1/signup",
  signupValidation(),
  tryCatch(async (request, response) => {
    const { email, password, ...userObject } = request.body;

    const isEmailExist = await findUserEmail(pool, email);
    if (isEmailExist)
      return response.status(409).send({
        message: "Šis el. paštas jau egzistuoja.",
        type: "error",
      });

    const verifyCode = await hashString(email);

    const createdAccountId = await createUserAccount(
      pool,
      email,
      await hashPassword(password),
      2,
      verifyCode
    );

    if (!createdAccountId) {
      return response.status(400).send({
        message: "Klaida kuriant paskyrą.",
        type: "error",
      });
    }

    const isCreatingUserSuccess = await createUser(
      pool,
      userObject,
      createdAccountId
    );

    if (!isCreatingUserSuccess)
      return response.status(400).send({
        message: "Klaida kuriant profilį.",
        type: "error",
      });

    const baseUrl = `http://localhost:3000/api/v1/`;
    const emailOptions = mailOptions(
      email,
      "Registracija",
      "",
      generateUserVerificationHtml(baseUrl, verifyCode)
    );

    const isEmailSuccess = await sendEmail(emailOptions);
    if (!isEmailSuccess)
      return response.status(400).send({
        message: "Sistemos klaida. Bandykite dar kartą.",
        type: "error",
      });

    return response.status(200).send({
      message:
        "Vartotojas sukurtas. Žinutė su patvirtinimo nuoroda išsiųsta į jūsų nurodytą el. paštą.",
      type: "success",
    });
  })
);

router.get(
  `/api/v1/verify-user`,
  tryCatch(async (request, response) => {
    const specialCode = request.query.code;

    const accountDetails = await getAccountVerified(pool, specialCode);
    if (!accountDetails) {
      return response.redirect("http://localhost:3000/");
    }
    const isExpired = CheckDate(accountDetails[0].expires);
    if (isExpired && accountDetails[0].verified === 0) {
      return response
        .status(400)
        .send("Deja jūsų profilio aktyvavimo nuoroda baigė galioti.");
    }

    await verifyAccount(pool, accountDetails[0].id);
    return response.redirect("http://localhost:3000/");
  })
);

router.post(
  "/api/v1/login",
  tryCatch(async (request, response) => {
    const { email, password } = request.body;

    const userData = await findUser(pool, email);

    if (!userData)
      return response.status(400).send({
        message: "Klaida, toks vartotojas neegzistuoja.",
        type: "error",
      });

    if (userData[0].verified === 0) {
      return response.status(400).send({
        message:
          "Klaida, pirmiau turite patvirtinti profilį per nuorodą kurią išsiuntėme",
        type: "error",
      });
    }

    const isPasswordMatch = await validatePassword(
      password,
      userData[0].accountPassword
    );
    if (!isPasswordMatch) {
      return response.status(400).send({
        message: "Klaida, slaptažodis arba el. paštas neteisingas.",
        type: "error",
      });
    }
    const userReview = userData[0].review ? true : false;

    request.session.userId = userData[0].id;
    const userRole = {
      role: userData[0].userRole,
      review: userReview,
    };
    return response.status(200).send(userRole);
  })
);

router.post(
  "/api/v1/forgot",
  tryCatch(async (request, response) => {
    const { email } = request.body;

    const doesUserExist = await findUserEmail(pool, email);
    if (!doesUserExist) {
      return response.status(200).send();
    }
    const emailWithCode = email + new Date().toISOString();
    const specialCode = await hashString(emailWithCode);
    const isSetSuccess = await setUserCode(pool, email, specialCode);
    if (!isSetSuccess) {
      return response.status(400).send({
        message: "Sistemos klaida. Bandykite dar kartą.",
        type: "error",
      });
    }

    const baseUrl = `http://localhost:3000/`;
    const emailOptions = mailOptions(
      email,
      "Slaptažodžio pakeitimas",
      "",
      generateUserForgotPasswordHtml(baseUrl, specialCode)
    );

    const isEmailSuccess = await sendEmail(emailOptions);
    if (!isEmailSuccess)
      return response.status(400).send({
        message: "Sistemos klaida. Bandykite dar kartą.",
        type: "error",
      });
    return response.status(200).send();
  })
);

router.post(
  "/api/v1/forgot-password",
  tryCatch(async (request, response) => {
    const { password, sCode } = request.body;
    // Check if reset password code exists
    const isCodeExist = await checkUserCode(pool, sCode);
    if (!isCodeExist) {
      return response.status(401).send();
    }
    // check if code not expired
    const isCodeNotExpired = await checkIfUserCodeExpired(pool, sCode);
    if (!isCodeNotExpired) {
      await resetUserCodeAndExpires(pool, sCode);
      return response.status(400).send({
        message:
          "Baigė galioti jūsų slaptažodžio atnaujinimo kodas. Turite atsisiųsti naują kodą.",
        type: "error",
      });
    }

    const isResetSuccess = await resetUserPassword(
      pool,
      sCode,
      await hashPassword(password)
    );
    if (!isResetSuccess) {
      return response.status(400).send({
        message: "Sistemos klaida. Bandykite dar kartą.",
        type: "error",
      });
    }
    return response.status(200).send();
  })
);

router.get(
  "/api/v1/forgot-password",
  tryCatch(async (request, response) => {
    const sCode = request.query.sCode;
    // Check if reset password code exists
    const isCodeExist = await checkUserCode(pool, sCode);
    if (!isCodeExist) {
      return response.status(400).send();
    }

    return response.status(200).send();
  })
);

router.get(
  "/logout",
  tryCatch(async (request, response) => {
    request.session.destroy();
    return response.status(200).send({
      message: "Logout successful",
    });
  })
);

export default router;

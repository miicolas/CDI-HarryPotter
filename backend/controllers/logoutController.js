const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("../config/queries");



async function logout(req, res) {
    try {
      // Supprime le cookie d'authentification
      res.clearCookie("AuthToken").redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging out" });
    }
  };


  
module.exports = {
  logout,
};
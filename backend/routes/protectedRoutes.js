// protectedRoutes.js
import express from 'express';
const router = express.Router();
import path from 'path';
import authenticateToken from '../middleware/authenticateToken.js';


router.get('/profil', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/profil.html'));
});
router.get("/settings", authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
});
router.get("/changeinfos", authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
});

export default router;

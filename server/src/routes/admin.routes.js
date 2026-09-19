const express = require("express");
const AdminController = require("../controllers/admin.controller");
const { authenticate } = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const ROLES = require("../constants/roles");
const { updateUserStatusValidator, updateUserRoleValidator } = require("../validators/admin.validator");

const router = express.Router();

router.use(authenticate);
router.use(authorize(ROLES.ADMIN));

router.get("/users", AdminController.getUsers);
router.patch("/users/:id/status", updateUserStatusValidator, AdminController.updateUserStatus);
router.patch("/users/:id/role", updateUserRoleValidator, AdminController.updateUserRole);
router.delete("/users/:id", AdminController.deleteUser);

router.get("/urls", AdminController.getAllUrls);
router.delete("/urls/:id", AdminController.deleteUrl);

router.get("/audit-logs", AdminController.getAuditLogs);
router.get("/stats", AdminController.getGlobalSystemStats);

module.exports = router;

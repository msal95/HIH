export const ability = AbilityBuilder.define((can, cannot) => {
  // Define roles and permissions
  can("read", "public"); // Public route accessible to all
  can("read", "dashboard"); // Dashboard route accessible to all
  can("read", "profile"); // Profile route accessible to all

  // Admin role permissions
  if (userRole === "admin") {
    can("manage", "adminPanel"); // Admin panel route only accessible to admins
    can("manage", "users"); // Users route only accessible to admins
    can("manage", "settings"); // Settings route only accessible to admins
  }

  // Manager role permissions
  if (userRole === "manager") {
    can("read", "reports"); // Reports route only accessible to managers
    can("read", "projects"); // Projects route only accessible to managers
  }

  // User role permissions
  if (userRole === "user") {
    can("read", "documents"); // Documents route only accessible to users
    can("create", "documents"); // Create document route only accessible to users
    can("update", "documents", { ownerId: currentUserId }); // Update own documents only
    cannot("delete", "documents"); // Users cannot delete documents
  }
});

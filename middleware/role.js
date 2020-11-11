const ROLES = {
    Superadmin: 'ROLE_SUPERADMIN',
    Admin: 'ROLE_ADMIN',
    User: 'ROLE_USER'
  };
  
  const checkRole = (...roles) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    console.log(req.user);
  
    const hasRole = roles.find(role => req.user.role === role);
    if (!hasRole) {
      return res.status(403).send('You are not allowed to make this request.');
    }
  
    return next();
  };
  
  const role = { ROLES, checkRole };
  
  module.exports = role;
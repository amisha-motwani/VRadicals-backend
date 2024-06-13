
//middleware req, res, next as a parameter leta hai, next means next function call hoga (jaha ye middleware call kara hai vo function execute hoga)

const RoleHrMiddleware = (req, res, next) => {
    // Get the role from the request header
    const role = req.header("Role");
    
    // Check if the role is provided
    if (!role) {
        return res.status(401).send({ error: "Role is required" });
    }

    // Check if the role is HR
    if (role !== "Hr") {
        return res.status(403).send({ error: "Access denied: Only HR can add employees." });
    }

    // If the role is HR, proceed to the next middleware or route handler
    next();
};

module.exports = RoleHrMiddleware;


module.exports = RoleHrMiddleware;

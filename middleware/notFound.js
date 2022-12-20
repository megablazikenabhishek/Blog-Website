const notFound = (req, res)=>res.status(404).send("Route Dosen't exists");


module.exports = notFound;
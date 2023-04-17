// sets the status code from 200 to 400 and sends out a custom message
const notFoundMiddleware = (req, res) =>
    res.status(404).send("Route does not exist.");

export default notFoundMiddleware;

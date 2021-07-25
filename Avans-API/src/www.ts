import io from './api/websocket';
import 'reflect-metadata';
import app from './app';
import typeorm from './config/typeorm';



typeorm().then(connection => {

    const port = process.env.PORT || 3000;

    // Start server
    const server = app.listen(port, () => console.log(`Listening on port ${port}`));

    // Attach websocket server
    io.attach(server, {
        handlePreflightRequest: (req, res) => {
            let header = req.headers['origin'] || '';

            res.setHeader('Access-Control-Allow-Origin', header);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Headers', 'Authorization');
            res.writeHead(200);
            res.end('ok');
        }
    });
}, err => {
    console.log(err);
});
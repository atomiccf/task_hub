
import express from "express";

export const app = express();
const PORT = 3001
import routes from './routes';
routes(app);

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

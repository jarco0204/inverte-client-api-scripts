import express from 'express';

//Instantiation of main app
const app = express();

//Middleware
app.use(express.json()); // support json encoded bodies

// Routes
app.get('/test', (req, res, next) => {
    res.json({ message: 'Elpepe' });
    next();
});

// Accepting requests
export const start = async () => {
    const port = 3000;
    app.listen(port, () => {
        console.log('Express API server is listening on port 3000');
    });
};

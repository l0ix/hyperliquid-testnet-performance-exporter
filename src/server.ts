import express from 'express';
import metricsRoutes from './routes/metrics.routes';

const app = express();

app.use('/', metricsRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Exporter is running on port ${PORT}`);
});

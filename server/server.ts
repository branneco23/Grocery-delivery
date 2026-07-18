import "dotenv/config";
import express, {Request, Response} from 'express';
import cors from "cors";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Servicio esta en Vivo!');
});

app.listen(port, () => {
    console.log(`Servicio esta Corriendo en http://localhost:${port}`); 
})
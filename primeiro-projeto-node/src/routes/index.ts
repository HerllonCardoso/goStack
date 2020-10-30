import { Router } from 'express'; //importamos o modulo Router do express.
import appointmentsRouter from './appointments.routes';

//criamos uma variavel routes recebendo o uso da função Routes do express.
const routes = Router();

//agora podemos criar uma rota usando o routes.use, o caminho dela, e o nome da rota(n esquecer
//de importar.)
routes.use('/appointments', appointmentsRouter);

export default routes;

//tendo toda nossas rotas de agendamento em um arquivo só, temos que dividir as responsabilidades.
//entao dividimos em repositories e models.


import { Router } from 'express';
//Biblioteca date-fns que é otima para trabalharmos com datahora,
//nesse caso importamos o startOfHour, que sempre arredondara os minutos pro inicio da hora que se encontra
//e o parseISO que ira converter a data no formato ISO.
import { startOfHour, parseISO } from 'date-fns';
//importar o repositorio(padrao de projeto)
import AppointmentsRepository from '../repositories/AppointmentsRepository';
//dentro do nosso agendamento usaremos o Router do express para criar todas nossas rotas necessarias
//para o agendamento

const appointmentsRouter = Router();

//variavel appointmentRepository ira receber um novo AppointmentsRepository
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  //na constante appointments iremos receber o metodo all do appointmentsRepository
  const appointments = appointmentsRepository.all();

  //retornara todos os appointments
  return response.json(appointments);
});

//rota para criar um agendamento
appointmentsRouter.post('/', (request, response) => {
  //iremos receber provider e date inseridos pelo usuario em sua requisição pelo corpo.
  const { provider, date } = request.body;

  // parsedDate vai receber a data convertida na iso e no seu inicio da hora. usando os metodos
  // startOfHour e parseISO que vem da lib date-fns
  const parsedDate = startOfHour(parseISO(date));

  //procurar agendamentos na memsa data vai receber de dentro dos repositorios de agendamento o metodo
  //procurar por datas.
  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  //se retornar true(por usamos o .FIND porque ele retorna true e false)
  //vai receber a mensagem que ja foi agendada.
  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }
//se retornar false, ele ira criar uma variavel appointment que receberar
// do nosso repositorio o metodo .create, passando o provider e o date(convertido)
  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  //retornando a resposta com o agendamento feito.
  return response.json(appointment);
});

export default appointmentsRouter;

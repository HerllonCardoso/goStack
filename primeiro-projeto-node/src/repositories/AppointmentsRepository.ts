import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';
//data transfer object
interface CreateAppointmentDTO {
  //temos uma interface que fará uma transferencia de dados
  //declaremos o formato das nossos objetos.
  provider: string;
  date: Date;
}

//criar uma classe que armazenara o repositorio de agendamentos
class AppointmentsRepository {
  // uma variavel privada usara o model Appointment.
  private appointments: Appointment[];

  constructor() {
    //construira nosso agendamento.
    this.appointments = [];
  }
//metodo publico que retornara ALL elementos dentro do agendamentos
  public all(): Appointment[] {
    return this.appointments;
  }

  //metodo publico que vai procurar agendamentos por data, recebendo a data por parametro
  //dentro da variavel findAppointment ele irá procurar dentro dos agendamentos, por um
  //agendamento que seja IGUAL a data.
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    //se tiver encontrado vai retorna-lo, se nao encontrar. será NULL.
    return findAppointment || null;
  }

  //metodo publico create para criar um agendamento no sistema.
  //metodo create vai receber o provider e o data que sera no formato da interface
  //DTO criada acima
  //que tambem sera nop formato do nosso appointment que se encontra no nosso model
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    //variavel appointment que recebera um novo appointment recebendo o provider e date.
    const appointment = new Appointment({ provider, date });
    //adicionara no agendamentos o agendamento.
    this.appointments.push(appointment);
    //retornara o agendamento
    return appointment;
  }
}

export default AppointmentsRepository;

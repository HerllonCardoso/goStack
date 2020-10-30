import { uuid } from 'uuidv4';
//Aqui criamos uma classe que será o modelo do nosso dado.
class Appointment {
  //passando o modelo dos dados.
  id: string;

  provider: string;

  date: Date;

  //criar um construtor que construira nosso dados, o Omit é para simplismente ele ignorar o ID na
  //passagem de dados por parametros, pois o Id pegaremos do nossa lib uuuid, e provider e date virá
  //no corpo da requisição feita pelo usuário
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;

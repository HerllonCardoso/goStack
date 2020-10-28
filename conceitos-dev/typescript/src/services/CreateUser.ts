//Para criar um usuario: name, email, passoword

interface TechObject {
  title: string;
  experiencie: number;
}

interface CreateUserData {
  name?: '';
  email: string;
  password: string;
  techs: Array<string> | TechObject; //variavel
  // techs : string[]; //unico
}

export default function createUser({name, email, password }: CreateUserData){
  const user = {
    name,
    email,
    password,
  }
  return user
}
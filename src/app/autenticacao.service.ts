import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';

export class Autenticacao {

    public cadastrarUsuario(usuario: Usuario): void {
        console.log("Cadastrando usuario: ", usuario);
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                //remove a senha do atributo senha do obj do usuario
                delete usuario.senha;

                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
            })
            .catch((erro: Error) => {
                console.log(erro);
            });
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => console.log(resposta))
            .catch((erro: Error) => console.log(erro));
    }

}

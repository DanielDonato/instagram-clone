import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable()
export class Autenticacao {

    public token_id: string;

    constructor(private router: Router) { }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('idToken', idToken);
                        this.router.navigate(['/home']);
                    });
            })
            .catch((erro: Error) => console.log(erro));
    }

    public autenticado(): boolean {
        const tokenId = localStorage.getItem('idToken');
        if (this.token_id === undefined && tokenId != null) {
            this.token_id = tokenId;
        }
        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }
        return this.token_id !== undefined;
    }

    sair() {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.token_id = undefined;
                this.router.navigate(['/']);
            });
    }

}

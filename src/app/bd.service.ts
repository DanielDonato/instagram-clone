import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {
        const nomeImagem = Date.now();
        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => { //no processo de upload
                    this.progresso.status = 'andamento';
                    this.progresso.estado = snapshot;
                    //console.log(snapshot);
                },
                (err) => {
                    this.progresso.status = 'erro';
                    //console.log(err);
                }, //se der erro
                () => {
                    this.progresso.status = 'concluido';
                    //console.log("Upload completo");
                }); // quando terminar 
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo});
    }
}

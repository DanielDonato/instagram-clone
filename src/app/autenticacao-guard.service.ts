import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Autenticacao } from './autenticacao.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacao: Autenticacao) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.autenticacao.autenticado();
    }
}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
//vai definir pro firebase para onde o usuario deve ir se n tiver logado


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin} 
  },
  {
    path: 'cliente-novo',
    loadChildren: () => import('./cliente-novo/cliente-novo.module').then( m => m.ClienteNovoPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin} 
  },
  {
    path: 'sair',
    loadChildren: () => import('./sair/sair.module').then( m => m.SairPageModule)
  },
  {
    path: 'clientes-visualizar/:id',
    loadChildren: () => import('./clientes-visualizar/clientes-visualizar.module').then( m => m.ClientesVisualizarPageModule)
  },
  {
    path: 'clientes-atualizar/:id',
    loadChildren: () => import('./clientes-atualizar/clientes-atualizar.module').then( m => m.ClientesAtualizarPageModule)
  },
  {//nos geramos a rota apenas para o cliente visualizar e n para passar codigo
    //essas rotas são acessadas informando o id
    path: 'clientes-excluir/:id',
    loadChildren: () => import('./clientes-excluir/clientes-excluir.module').then( m => m.ClientesExcluirPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

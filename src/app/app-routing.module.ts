import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'walkthrough', pathMatch: 'full' },
  // { path: 'walkthrough', loadChildren: './walkthrough/walkthrough.module#WalkthroughPageModule' },
  // { path: 'getting-started', loadChildren: './getting-started/getting-started.module#GettingStartedPageModule' },
  // { path: 'auth/login', loadChildren: './global/pages/login/login.module#LoginPageModule' },
  // { path: 'auth/signup', loadChildren: './signup/signup.module#SignupPageModule' },
  // { path: 'auth/forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  // { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'contact-card', loadChildren: './contact-card/contact-card.module#ContactCardPageModule' },
  // { path: 'forms-and-validations', loadChildren: './forms/validations/forms-validations.module#FormsValidationsPageModule' },
  // { path: 'forms-filters', loadChildren: './forms/filters/forms-filters.module#FormsFiltersPageModule' },
  // { path: 'page-not-found', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' },
  // { path: 'showcase', loadChildren: './showcase/showcase.module#ShowcasePageModule' },
  // { path: 'firebase', loadChildren: './firebase/firebase-integration.module#FirebaseIntegrationModule' },
  // { path: 'maps', loadChildren: './maps/maps.module#MapsPageModule' },
  // { path: 'video-playlist', loadChildren: './video-playlist/video-playlist.module#VideoPlaylistPageModule' },
 // { path: '**', redirectTo: 'page-not-found' },

  // **************************************************************

  //Acarreos
 
  { path: 'global', redirectTo: 'walkthrough', pathMatch: 'full' },
  { path: 'walkthrough', loadChildren: './walkthrough/walkthrough.module#WalkthroughPageModule' },
  { path: 'auth/login', loadChildren: './global/pages/login/login.module#LoginPageModule' },
  {path:'home1', loadChildren: './global/pages/categories/categories.module#CategoriesPageModule'},
  { path: 'home', loadChildren: './global/pages/home/home.module#HomePageModule' },
  { path: 'maps', loadChildren: './maps/maps.module#MapsPageModule' },
  { path: 'mapas', loadChildren: './global/mapas/mapas.module#MapasPageModule' },
  { path: 'login', loadChildren: './global/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './global/pages/registro/registro.module#RegistroPageModule' },
  { path: 'prueba', loadChildren: './global/pages/prueba/prueba.module#PruebaPageModule' },
  { path: 'registrousuario', loadChildren: './global/pages/registrousuario/registrousuario.module#RegistrousuarioPageModule' },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

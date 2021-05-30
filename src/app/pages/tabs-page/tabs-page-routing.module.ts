import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { AnalyticsPage } from '../analytics/analytics';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'analytics',
        children: [
          {
            path: '',
            component: AnalyticsPage,
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },
      {
        path: 'vaccination',
        children: [
          {
            path: '',
            loadChildren: () => import('../vaccination/vaccination.module').then(m => m.VaccinationModule)
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          },
          {
            path: 'speaker-details/:speakerId',
            loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
          }
        ]
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () => import('../news/news.module').then(m => m.NewsModule)
          }
        ]
      },
      {
        path: 'health',
        children: [
          {
            path: '',
            loadChildren: () => import('../health/health.module').then(m => m.HealthModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/analytics',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }


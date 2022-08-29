import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'divider-1',
    type: 'divider',
  },
  {
    id: 'apps',
    title: 'Tasks',
    subtitle: 'FuseTasks agora é uma ferramenta Google!',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'TASKS',
    children: [
      {
        id: 'apps.ecommerce',
        title: 'Minhas Tarefas',
        type: 'collapse',
        icon: 'heroicons-outline:clipboard-list',
        translate: 'Minhas Tarefas',
      },
    ],
  },
  {
    id: 'divider-2',
    type: 'divider',
  },
];

export default navigationConfig;

export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Cadastros',
    url: '/cadastro',
    icon: 'icon-pencil',
    children: [
      {
        name: 'Notícias',
        url: '/noticias',
        icon: 'icon-envelope-letter'
      },
      {
        name: 'Guia comercial',
        url: '/guia-comercial',
        icon: 'icon-map'
      },
      {
        name: 'Botões',
        url: '/botoes',
        icon: 'icon-layers'
      },
      {
        name: 'Agenda de eventos',
        url: '/agenda-de-eventos',
        icon: 'icon-directions'
      },
      {
        name: 'Categorias',
        url: '/categorias',
        icon: 'icon-folder'
      },
      {
        name: 'Segmentos',
        url: '/segmentos',
        icon: 'icon-tag'
      },
      {
        name: 'Banner',
        url: '/banner',
        icon: 'icon-doc'
      },
      {
        name: 'Vídeos',
        url: '/videos',
        icon: 'icon-doc'
      }
    ]
  },
  {
    name: 'Listas',
    url: '/listas',
    icon: 'icon-list',
    children: [
      {
        name: 'Notícias',
        url: '/listar-noticias',
        icon: 'icon-envelope-letter'
      },
      {
        name: 'Guia comercial',
        url: '/listar-guia-comercial',
        icon: 'icon-map'
      },
      {
        name: 'Botões',
        url: '/listar-botoes',
        icon: 'icon-layers'
      },
      {
        name: 'Agenda de eventos',
        url: '/listar-eventos',
        icon: 'icon-directions'
      },
      {
        name: 'Categorias',
        url: '/listar-categorias',
        icon: 'icon-folder'
      },
      {
        name: 'Segmentos',
        url: '/listar-segmentos',
        icon: 'icon-tag'
      },
      {
        name: 'Banner',
        url: '/listar-banner',
        icon: 'icon-doc'
      },
      {
        name: 'Contato',
        url: '/listar-contato',
        icon: 'icon-phone'
      }
    ]
  }
];

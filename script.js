




//Registro de Características de PWA's
((d, w, n, c) => {
  //Registro de SW
  if ( 'serviceWorker' in n ) {
    w.addEventListener('load', () => {
      n.serviceWorker.register('./sw.js')
        .then( registration => {
          c(registration)
          c(
            'Service Worker registrado con éxito',
            registration.scope
          )
        })
        .catch( err => c(`Registro de Service Worker fallido`, err) )
    })
  }

  //Activar Notificaciones
  if( w.Notification && Notification.permission !== 'denied' ) {
    Notification.requestPermission(status => {
      console.log(status)
      let n = new Notification('Título', {
        body: 'Soy una notificación :)',
        icon: './images/twitter.png'
      })
    })
  }
  //Compartiendo contenido con el API Share
  if ( n.share !== undefined ) {
    d.addEventListener('DOMContentLoaded', e => {
      let shareBtn = d.getElementById('share')
      shareBtn.addEventListener('click', e => {
        n.share({
          title: d.title,
          text: 'Hola soy un contenido para compartir',
          url: w.location.href
        })
        .then(() => c.log('Contenido compartido con éxito') )
          .catch( err => c.log('Error al compartir: ', err) )
      })
    })
  }
})(document, window, navigator, console.log);

//Detección del Estado de la Conexión
((d, w, n, c) => {
  const header = d.querySelector('.Header'),
    metaTagTheme = d.querySelector('meta[name=theme-color]')

  function networkStatus (e) {
    c( e, e.type )

    if ( n.onLine ) {
      metaTagTheme.setAttribute('content', '#F7DF1E')
      header.classList.remove('u-offline')
      swal("Conexión Recuperada", "You clicked the button!", "success");
    } else {
      metaTagTheme.setAttribute('content', '#666')
      header.classList.add('u-offline')
      swal("Conexión Pérdida", "You clicked the button!", "error");
    }
  }

  d.addEventListener('DOMContentLoaded', e => {
    if ( !n.onLine ) {
      networkStatus(this)
    }
    w.addEventListener('online', networkStatus)
    w.addEventListener('offline', networkStatus)
  })
})(document, window, navigator, console.log);
(document, window, navigator, console.log);

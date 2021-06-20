# NX - App

**NX - App**, esta realizado en ReactJS, utilizando functional components.


## Uso

Para su uso, es necesario agregar un archivo .env, donde se va a definir la URL de la api:

```
REACT_APP_API_URL=http://localhost:3005/api
```

Una vez configurado se puede ejecutar con:

### `npm start`


## TODO's

Bueno....aun faltan bastante features que me quedaron pendiente y aun no pude continuar:

### Envio de mails
- Enviar el mail de registracion para que confirme, y el mail para habilitar el cambio de password.

### UI
- Agregar la configuracion de categorias por usuario, para esto hay que crear la tabla de configuracion.
- Agregar que se pueda reiniciar el password de un usuario. (password olvidado)
- Agregar los google captcha para los login y el registro.
- Agregar el metodo para los mods que puedan borrar cosas. No se van a borrar, pero se van a grabar en una tabla independiente y despues se decide que hacer.
- Agregar que se pueda generar una boludes interesante, como la de los colores, posibles ideas:
	 Un generador de nombre al azar para todos los usuarios del post, y que se mantenga el mismo para todos durante la vida de ese post. No seria el estilo por defecto. (como id unico)
- Agregar algo visual, como lo de los colores, o algna imagen chiquita.
- Ver como optimizar los enums y ese tipo de cosas: Roles, etc.
- Ver que hacemos con el tema de los errores por validation, habria que agregar que los parsee y los devuelva en forma de lista.

### Notificaciones de UI
- Agregar las notificaciones mediante socket.io



## Contribuciones
Todas las pull request son bienvenidas.

## Screenshots

Les paso algunas capturas:

![mobile](https://user-images.githubusercontent.com/15146550/122689799-bfcfdf80-d1fb-11eb-9fcd-f39af4352b3f.png)
![new post](https://user-images.githubusercontent.com/15146550/122689800-c1010c80-d1fb-11eb-8926-060a8a7c99d0.png)
![post](https://user-images.githubusercontent.com/15146550/122689801-c199a300-d1fb-11eb-9128-55cd74d855db.png)


## Licencia
[MIT](https://choosealicense.com/licenses/mit/)

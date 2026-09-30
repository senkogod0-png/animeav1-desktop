# AnimeAV1 Desktop

Aplicacion de escritorio para Windows que abre [AnimeAV1](https://animeav1.com/) en una ventana propia, sin barra de direcciones ni menus del navegador.

## Caracteristicas

- Ejecutable portable para Windows de 64 bits: no requiere instalacion.
- Sesion local persistente para conservar el estado del sitio entre aperturas.
- Recarga con `F5` o `Ctrl + R` y pantalla completa con `F11`.
- Los enlaces externos se abren en el navegador predeterminado.
- Pantalla de reintento cuando no hay conexion con el sitio.

## Uso

Descarga y abre `outputs/AnimeAV1-Desktop-1.0.0-portable.exe`. La aplicacion requiere conexion a Internet porque el contenido se carga directamente desde AnimeAV1.

## Desarrollo

```powershell
npm install
npm start
```

Para generar un nuevo ejecutable:

```powershell
npm run dist
```

El archivo final se genera en `outputs/`.

## Creditos

- Proyecto e iniciativa: [GyroZ (@senkogod0-png)](https://github.com/senkogod0-png)
- Desarrollo y empaquetado: GyroZ
- Sitio cargado por la aplicacion: [AnimeAV1](https://animeav1.com/)

Esta es una aplicacion independiente y no esta afiliada ni respaldada por AnimeAV1. El contenido mostrado pertenece a sus respectivos propietarios y proveedores.

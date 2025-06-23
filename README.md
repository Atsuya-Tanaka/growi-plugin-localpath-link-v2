# GROWI plugin for Local Path Link

GROWI plugin to write Local Path Link in page. 

GROWi v7.2 or later is required

## WARNING
This plugin can lead to security vulnerabilities.

## Usage
```
<a data-lpath='C:\foo'></a>                 // What you write in edit page.

<a href="file://C:\foo">C:\foo</a>          // What you get in browser page.
```

```
<a data-lpath='C:\foo'>Text Content</a>     // What you write in edit page.

<a href="file://C:\foo">Text Content</a>    // What you get in browser page.
```

Left click to copy the path.

## Options
```
<a data-lpath='C:\foo' data-copyoff></a>    // Disable copy the path.
```

## for your information
Most Web-browsers disable Local Path Link.  
If you want to go by one-click, need some add-on or setting. 

## License

MIT


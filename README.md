![mailchute](/src/img/mailchute.png)

# Mailchute
---

Mailchute is a combination of popular front-end development tools with a few tweaks to help designers build HTML emails quickly.

## It's built using:

- [Gulp](https://github.com/gulpjs/gulp) to stream changes to data, templates, and stylesheets
- JSON objects to store content and copy
- [Pug](https://github.com/pugjs/pug) to make building templates and reusable components easy
- [SCSS](https://github.com/sass/sass) to style it all up (including a few bits and pieces from [BassCSS](https://github.com/basscss/basscss))
- [BrowserSync](https://github.com/BrowserSync/browser-sync) to preview how your email will look
- [Premailer](https://github.com/premailer/premailer) to inline your styles when you're ready to send it.

## Getting Started
---

Clone repo locally.

Make sure you have at least Node v6.0.0, then run ```npm install``` from the ```mailchute``` directory.

When finished installing dependencies, run ```gulp```. This should launch your main browser and start BrowserSync, displaying the example file at ```localhost:3000```.
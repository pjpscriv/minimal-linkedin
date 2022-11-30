let mix = require("laravel-mix");

mix.js("src/js/handlers.js", "chrome/js");
mix.js("src/js/main.js", "chrome/js");

mix.copyDirectory("vendor", "chrome/vendor");
mix.js("src/js/config.js", "chrome/js");
mix.js("src/js/popup.js", "chrome/js");

mix.postCss("src/css/app.css", "chrome/css");
mix.css("src/css/minimal.css", "chrome/css");

mix.copyDirectory("src/images", "chrome/images");
mix.copyDirectory("src/partials", "chrome/partials");
mix.copyDirectory("src/pages", "chrome/pages");

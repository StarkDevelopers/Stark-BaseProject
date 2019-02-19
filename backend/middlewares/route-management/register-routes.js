const path = require('path');

const glob = require('glob');

function registerRoutes (app) {
    const indexFiles = glob.sync(
        path.join(__dirname, 'features/**', '*.index.js')
    );

    indexFiles.forEach((file) => {
        require(file)(app);
    });
}

module.exports = registerRoutes;

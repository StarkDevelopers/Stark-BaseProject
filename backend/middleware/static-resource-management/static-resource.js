const path = require('path');

const express = require('express');

function staticResources(app, rootDirectory) {
    /**
     * Using EJS template engine for server side templating
     * For login, register, forgot password, error pages
     */
    app.set('view engine', 'ejs');

    /**
     * Serving static files in Express from views/utils directory
     * Most of the requests for these kind of resources will be from EJS Templates
     */
    app.use('/utils', express.static(path.join(rootDirectory, 'views/utils')));
    /**
     * Serving static files in Express from client directory
     */
    app.use(express.static(path.join(rootDirectory, 'client')));
}

module.exports = staticResources;

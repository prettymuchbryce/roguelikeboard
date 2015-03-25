var React = require('react');
var MainComponent = require('./components/main.jsx');
var $ = require('jquery');

var initialize = function() {
    React.initializeTouchEvents(true)
    var element = React.createElement(MainComponent);
    React.render(element, $('.react-container')[0]);
};

initialize();
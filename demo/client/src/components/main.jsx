var React = require('react');
var AsciiRenderer = require('../../../../src/roguelikeboard.jsx');
var _ = require('lodash');
var $ = require('jquery');

var Main = React.createClass({
    componentDidMount: function() {
        var testMap = [];
        for (var y = 0; y < 200; y++) {
            testMap.push([]);
            for (var x = 0; x < 200; x++) {
                var dist = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,2,2,3,4];
                var tile;
                if (y === 10) {
                    tile = 1;
                } else {
                    tile = dist[Math.floor(Math.random()*dist.length)]
                }
                testMap[y].push(tile);
            }
        }
        var self = this;
        var player = { type: 'player', x: 0, y: 10};
        var objects = [player];
        var lastMove; //always prefer previous move
        setInterval(function() {
            var isValidMove = function(position, player, map) {
                var x = position.x + player.x;
                var y = position.y + player.y;
                if (x < 0 || y < 0 || x > map[0].length || y > map.length) {
                    return false;
                }
                if (map[y][x] !== 1) {
                    return false;
                }

                return true;
            }

            var moves = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x:0, y: -1}];
            player.x++;
            self.refs.asciiRenderer.setObjects(objects);
            self.refs.asciiRenderer.setCameraPosition(player.x, player.y);
        },100);
        self.refs.asciiRenderer.setObjects(objects);
        self.refs.asciiRenderer.setCameraPosition(player.x, player.y);
        this.refs.asciiRenderer.setObjects(objects);
        self.refs.asciiRenderer.setViewportSize(Math.floor(window.innerWidth/29),10);
        $(window).resize(function() {
            self.refs.asciiRenderer.setViewportSize(Math.floor(window.innerWidth/29),10);
        });
        this.refs.asciiRenderer.setCSSClassForObject('player', 'symbol-player');
        this.refs.asciiRenderer.setCSSClassForTile(0, 'symbol-tree');
        this.refs.asciiRenderer.setCSSClassForTile(1, 'symbol-grass');
        this.refs.asciiRenderer.setCSSClassForTile(2, 'symbol-rock');
        this.refs.asciiRenderer.setCSSClassForTile(3, 'symbol-house');
        this.refs.asciiRenderer.setCSSClassForTile(4, 'symbol-water');
        this.refs.asciiRenderer.setTileMap(testMap);
    },
    componentWillUnmount: function() {
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div>
                <div>
                    <AsciiRenderer ref="asciiRenderer" />
                </div>
                <br/><br/>
                <div className="container">
                    <div className="col-lg-12 text-center">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 info-container">
                            <div className="info-content">
                                <div className="title">
                                    What is it?
                                </div>
                                <div className="body">
                                    roguelikeboard.jsx is a simple react.js component for rendering ASCII inspired <a href = "http://en.wikipedia.org/wiki/Roguelike">roguelike</a> boards on the web. 
                                    <br/><br/>
                                    roguelikeboard uses HTML/CSS, rather than WebGL or Canvas to render the game board. One interesting side effect being that you get all of the benefits of CSS when rendering your board.
                                    <br/><br/>
                                    This means that the demo you see above is rendered largely using CSS. The symbols themselves are rendered with the content property in an :after selector.
                                    <br/><br/>
                                    <a href = "http://www.github.com/prettymuchbryce/roguelikeboard">To learn more, visit github</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Main;
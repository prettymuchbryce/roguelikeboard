//For require.js
if (typeof define === "function" && define.amd) {
    define("roguelikeboard", ['react'], function(React) {
        return initialize();
    });
}

//For browserify
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
    module.exports = initialize();
}

function initialize() {
    return React.createClass({
        setCSSClassForTile: function(number, cssClass) {
            this.state.tileClassMap[number] = cssClass;
            this.setState({tileClassMap: this.state.tileClassMap});
        },
        setCSSClassForObject: function(type, cssClass) {
            this.state.objectClassMap[type] = cssClass;
            this.setState({objectClassMap: this.state.objectClassMap});
        },
        setObjects: function(objects) {
            var objectMap = {};
            for (var i = 0; i < objects.length; i++) {
                objectMap[objects[i].x + "_" + objects[i].y] = objects[i];
            }
            this.setState({objectMap: objectMap})
        },
        setCameraPosition: function(x, y) {
            this.setState({camera: {x: x, y: y}})
        },
        setViewportSize: function(width, height) {
            this.setState({viewportSize: {width: width, height: height}})
        },
        setTileMap: function(map) {
            this.setState({map: map})
        },
        getBoundedValue: function(value, min, max) {
            if (value < min) {
                value = min;
            }
            if (value > max) {
                value = max;
            }
            return value;
        },
        crop: function(map, width, height, cameraX, cameraY) {
            if (!map[0] || !map[0].length) {
                return { map: map, offsetLeft: 0, offsetTop: 0};
            }
            var mapWidth = map[0].length;
            var mapHeight = map.length;
            var m = [];

            var frameWidth = Math.floor(width/2);
            var frameHeight = Math.floor(height/2);

            cameraX = this.getBoundedValue(cameraX, 0, mapWidth);
            cameraY = this.getBoundedValue(cameraY, 0, mapHeight);

            var cameraLeft = this.getBoundedValue(cameraX - frameWidth, 0, mapWidth - width);
            var cameraTop = this.getBoundedValue(cameraY - frameHeight, 0, mapHeight - height);

            for (var y = cameraTop; y < cameraTop+height; y++) {
                m.push([]);
                for (var x = cameraLeft; x < cameraLeft+width; x++) {
                    m[m.length-1].push(map[y][x]);
                }
            }
            return {map: m, offsetLeft: cameraLeft, offsetTop: cameraTop};
        },
        getInitialState: function() {
            return {map: [], viewportSize: {width: 0, height: 0}, tileClassMap: {}, objectClassMap: {}, camera: {x: 0, y: 0}, objectMap: {}};
        },
        render: function() {
            if (!this.state.map) {
                return;
            }
            if (!this.state.viewportSize) {
                return;
            }
            var m = this.state.map;
            var cropped = this.crop(m, this.state.viewportSize.width, this.state.viewportSize.height, this.state.camera.x, this.state.camera.y);
            var map = cropped.map;
            var offsetLeft = cropped.offsetLeft;
            var offsetTop = cropped.offsetTop;
            var renderMap = [];
            var mapElements = [];
            var mapElement = '';
            for (var y = 0; y < map.length; y++) {
                for (var x = 0; x < map[0].length; x++) {
                    if (this.state.objectMap[(x + offsetLeft) + "_" + (y + offsetTop)]) {
                        var className = this.state.objectClassMap[this.state.objectMap[(x + offsetLeft)  + "_" + (y + offsetTop)].type];
                        var classes = 'rb-symbol';
                        classes += ' ' + className;
                        var key = x + "_" + y;
                        mapElement = (<span key={key} className={classes}></span>);
                        mapElements.push(mapElement);
                    } else {
                        var className = this.state.tileClassMap[map[y][x]];
                        var classes = 'rb-symbol';
                        classes += ' ' + className;
                        var key = x + "_" + y;
                        mapElement = (<span key={key} className={classes}></span>);
                        mapElements.push(mapElement);
                    }
                }
                var key = y + "_br";
                mapElements.push(<br key={key} />)
            }
            return (
                <div className="rb-renderer-container">
                    <div className="rb-renderer">
                        {mapElements}
                    </div>
                </div>
            )
        }
    });
}
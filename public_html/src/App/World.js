/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode, ArmSegment */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function World() {
    this.mShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");     // Path to the simple FragmentShader
        
    // ********************************************
    //         control point for the mouse
    // ********************************************
    this.mXfSq = new SquareRenderable(this.mShader);
    this.mXfSq.setColor([0.3, 0., 0.3, 1]);
    this.mXfSq.getXform().setSize(0.2, 0.2);

    // ********************************************
    //               the rooms / house
    // ********************************************
    // TODO: add floors

    // initial rooms / house
    var room = new Room(this.mShader, "Living Room", 0, 3, 12, 8);
    this.mHouse = new SceneNode(this.mShader, "House", false, 0,0);
    this.mHouse.addAsChild(room);
    this.mRooms = this.mHouse.mChildren;

    // viewport background
    this.mBackground = new SquareRenderable(this.mShader);
    this.mBackground.setTexture(new Texture('assets/blueprint.jpg'));
    this.mBackground.getTexXform().setPosition(0,0);
    this.mBackground.getTexXform().setSize(10000, 10000);
    this.mBackground.getXform().setSize(147500, 110000);
    // this.mBackground.getXform().setSize(25, 25);
    this.mBackground.getXform().setPosition(0, 3);

    // root
    this.mRoot = new SceneNode(this.mShader, "Root", false, 0,0);
    this.mRoot.addToSet(this.mBackground);
    this.mRoot.addAsChild(this.mHouse);

    // ********************************************
    //                   textures
    // ********************************************
    // TODO: move this to somewhere more global
    this.textures = {
        "Bed 1": new Texture('assets/bed1.png'),
        "Bed 2": new Texture('assets/bed2.png'),
        "Lamp 1": new Texture('assets/lamp1.png'),
        "Plant 1": new Texture('assets/plant1.png'),
        "Chair 1": new Texture('assets/chair1.png'),
        "Chair 2": new Texture('assets/chair2.png'),
        "Couch 1": new Texture('assets/couch1.png'),
        "Couch 2": new Texture('assets/couch2.png'),
        "Ceiling Fan 1": new Texture('assets/ceiling_fan1.png'),
        "Rug 1": new Texture('assets/rug1.png'),
        "Table 1": new Texture('assets/table1.png'),
        "Chair 3": new Texture('assets/chair3.png'),
        "Couch": new Texture('assets/couch.png'),
        "Couch 3": new Texture('assets/couch3.png'),
        "Ceiling Fan": new Texture('assets/ceiling_fan.png'),
        "Rug": new Texture('assets/rug.png'),
        "Rug 2": new Texture('assets/rug2.png'),
        "Table": new Texture('assets/table.png'),
        "Table 2": new Texture('assets/table2.png')
    };
}

World.prototype.draw = function (camera, drawCeiling) {
    camera.setupViewProjection();

    for(var i = 0; i < this.mRooms.length; i++)
        this.mRooms[i].setDrawCeiling(drawCeiling);
    
    this.mRoot.draw(camera);
};

World.prototype.update = function () {

};
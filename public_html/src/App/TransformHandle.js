/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// renderable representing the scale (vertical) and rotation (horizontal) handle bars 
function TransformHandle(shader, transformable) {
    SceneNode.call(this, shader, "Handle", false);
    this.setTransformable(transformable);

    var obj, xf, barWidth = 0.1, barLen = 1;

    // The vertical handle bar
    this.yBar = obj = new SquareRenderable(shader);  
    xf = obj.getXform();
    obj.setColor([0, 0, 0, 1]); // black
    xf.setSize(barWidth, barLen);
    xf.setPosition(0, barLen/2);
    this.addToSet(obj);

    // The horizontal handle bar
    this.xBar = obj = new SquareRenderable(shader);  
    xf = obj.getXform();
    obj.setColor([0, 0, 0, 1]); // black
    xf.setSize(barLen, barWidth);
    xf.setPosition(barLen/2, 0);
    this.addToSet(obj);

    // The vertical handle bar tip
    this.yBarTip = obj = new CircleRenderable(shader);  
    xf = obj.getXform();
    obj.setColor([1, 1, 0, 1]); // red
    xf.setSize(0.2, 0.2);
    xf.setPosition(0, barLen);
    this.addToSet(obj);

    // The horizontal handle bar tip
    this.xBarTip = obj = new CircleRenderable(shader);  
    xf = obj.getXform();
    obj.setColor([0.5, 0.1, 1, 1]); // red
    xf.setSize(0.2, 0.2);
    xf.setPosition(barLen, 0);
    this.addToSet(obj);
    
    // the trans handle tip
    this.transTip = obj = new SquareRenderable(shader);
    xf = obj.getXform();
    obj.setColor([1,0,0,1]);
    xf.setSize(0.3,0.3);
    xf.setPosition(0,0);
    this.addToSet(obj);
}
gEngine.Core.inheritPrototype(TransformHandle, SceneNode);

// syncrhonize with the target transformableNode
TransformHandle.prototype.update = function () { 
    if (!this.mTransformable) return;

    // set position
    var transformableForm = this.mTransformable.getXform();
    var posWC = this.mTransformable.localToWC(transformableForm.getPivot());
    this.getXform().setPosition(posWC[0],posWC[1]);

    // set rotation
    var rot = this.mTransformable.getWCRotation();
    // var rot = 0, currNode = this.mTransformable;
    // do rot += currNode.getXform().getRotationInRad();
    // while (currNode = currNode.mParent);
    this.getXform().setRotationInRad(rot);
};

TransformHandle.prototype.setTransformable = function (transformable) {
    this.setName(transformable ? transformable.getName + " Handle" : "Handle");
    this.mTransformable = transformable;
    this.update();
};

TransformHandle.prototype.mouseInTransHandle = function (wcX,wcY,maxDist) {
    var tipPos = this.transTip.getXform().getPosition();
    var posWC = vec2.fromValues(0, 0);
    vec2.transformMat4(posWC, tipPos, this.getXform().getXform());

    return this._mouseWithin(posWC[0], posWC[1], wcX, wcY, maxDist);
};

TransformHandle.prototype.mouseInScaleHandle = function (wcX,wcY,maxDist) {
    var tipPos = this.yBarTip.getXform().getPosition();
    var posWC = vec2.fromValues(0, 0);
    vec2.transformMat4(posWC, tipPos, this.getXform().getXform());

    return this._mouseWithin(posWC[0], posWC[1], wcX, wcY, maxDist);
};

TransformHandle.prototype.mouseInRotHandle = function (wcX,wcY,maxDist) {
    var tipPos = this.xBarTip.getXform().getPosition();
    var posWC = vec2.fromValues(0, 0);
    vec2.transformMat4(posWC, tipPos, this.getXform().getXform());

    return this._mouseWithin(posWC[0], posWC[1], wcX, wcY, maxDist);
};

TransformHandle.prototype._mouseWithin = function (targetX,targetY,wcX,wcY,maxDist) {
    if (!this.mTransformable) return false;

    var dist = Math.sqrt(Math.pow(wcX - targetX, 2) + Math.pow(wcY - targetY, 2));
    return dist <= maxDist;
};


TransformHandle.prototype.draw = function (aCamera, parentMat) {
    if (!this.mTransformable) return false;
    
    this.update();
    SceneNode.prototype.draw.call(this, aCamera, parentMat);
};



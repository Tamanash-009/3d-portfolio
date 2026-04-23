import { test, describe, before, after, mock } from 'node:test';
import assert from 'node:assert';
import * as THREE from 'three';
import { handleMouseMove, handleTouchMove, handleTouchEnd, handleHeadRotation } from './mouseUtils.ts';

// Mock global window
const originalWindow = global.window;
const originalMouseEvent = global.MouseEvent;
const originalTouchEvent = global.TouchEvent;

describe('mouseUtils', () => {
  before(() => {
    global.window = {
      innerWidth: 1000,
      innerHeight: 1000,
      scrollY: 0,
    } as any;

    // Minimal mock for MouseEvent and TouchEvent if they don't exist in environment
    if (!global.MouseEvent) {
        global.MouseEvent = class {
            clientX: number;
            clientY: number;
            constructor(type: string, init: any) {
                this.clientX = init.clientX;
                this.clientY = init.clientY;
            }
        } as any;
    }

    if (!global.TouchEvent) {
        global.TouchEvent = class {
            touches: any[];
            constructor(type: string, init: any) {
                this.touches = init.touches;
            }
        } as any;
    }
  });

  after(() => {
    global.window = originalWindow;
    global.MouseEvent = originalMouseEvent;
    global.TouchEvent = originalTouchEvent;
  });

  test('handleMouseMove calls setMousePosition with correct coordinates', () => {
    const setMousePosition = mock.fn();
    const event = new MouseEvent('mousemove', { clientX: 500, clientY: 500 });

    handleMouseMove(event, setMousePosition);

    // (500 / 1000) * 2 - 1 = 0.5 * 2 - 1 = 0
    // -((500 / 1000) * 2 - 1) = -(0.5 * 2 - 1) = 0
    assert.strictEqual(setMousePosition.mock.callCount(), 1);
    assert.deepStrictEqual(setMousePosition.mock.calls[0].arguments, [0, 0]);
  });

  test('handleTouchMove calls setMousePosition with correct coordinates', () => {
    const setMousePosition = mock.fn();
    const event = new TouchEvent('touchmove', {
      touches: [{ clientX: 750, clientY: 250 }]
    });

    handleTouchMove(event, setMousePosition);

    // (750 / 1000) * 2 - 1 = 0.75 * 2 - 1 = 0.5
    // -((250 / 1000) * 2 - 1) = -(0.25 * 2 - 1) = -(-0.5) = 0.5
    assert.strictEqual(setMousePosition.mock.callCount(), 1);
    assert.deepStrictEqual(setMousePosition.mock.calls[0].arguments, [0.5, 0.5]);
  });

  test('handleTouchEnd calls setMousePosition twice after timeouts', (t, done) => {
    // Note: Node.js 22.x has mock.timers, but using it with setTimeout in the code
    // might require t.mock.timers.enable()
    t.mock.timers.enable();
    const setMousePosition = mock.fn();

    handleTouchEnd(setMousePosition);

    t.mock.timers.tick(2000);
    assert.strictEqual(setMousePosition.mock.callCount(), 1);
    assert.deepStrictEqual(setMousePosition.mock.calls[0].arguments, [0, 0, 0.03, 0.03]);

    t.mock.timers.tick(1000);
    assert.strictEqual(setMousePosition.mock.callCount(), 2);
    assert.deepStrictEqual(setMousePosition.mock.calls[1].arguments, [0, 0, 0.1, 0.2]);
    done();
  });

  test('handleHeadRotation updates bone rotation correctly', () => {
    const headBone = new THREE.Object3D();
    const lerp = (x: number, y: number, t: number) => x + (y - x) * t;

    // Scenario 1: scrollY < 200, mouseY within bounds
    global.window.scrollY = 0;
    handleHeadRotation(headBone, 0.5, 0.1, 0.1, 0.1, lerp);

    const maxRotation = Math.PI / 6;
    const expectedY = 0 + (0.5 * maxRotation - 0) * 0.1;
    const expectedX = 0 + ((-0.1 - 0.5 * maxRotation) - 0) * 0.1;

    assert.ok(Math.abs(headBone.rotation.y - expectedY) < 0.0001);
    assert.ok(Math.abs(headBone.rotation.x - expectedX) < 0.0001);

    // Scenario 2: scrollY >= 200, innerWidth > 1024
    global.window.scrollY = 300;
    global.window.innerWidth = 1200;
    headBone.rotation.x = 0;
    headBone.rotation.y = 0;

    handleHeadRotation(headBone, 0.5, 0.1, 0.1, 0.1, lerp);

    const expectedX2 = 0 + (-0.4 - 0) * 0.03;
    const expectedY2 = 0 + (-0.3 - 0) * 0.03;

    assert.ok(Math.abs(headBone.rotation.x - expectedX2) < 0.0001);
    assert.ok(Math.abs(headBone.rotation.y - expectedY2) < 0.0001);
  });
});

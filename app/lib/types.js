'use strict';

import { Map, OrderedMap } from 'immutable';
/*eslint-disable*/
export function $Model(props, propName, componentName) {
    let prop = props[propName];

    if (!Map.isMap(prop) || !prop.get('id')) {
        return new Error(`You must pass Model for prop ${propName}, check ${componentName}`);
    }
}
export const Model = $Model;

export function $Models(props, propName, componentName) {
    let prop = props[propName];

    if (!Map.isMap(prop) && !OrderedMap.isOrderedMap(prop)) { //TODO add checking each model
        return new Error(`You must pass Models for prop ${propName},
            but you pass ${prop},
            check ${componentName}`);
    }
}
export const Models = $Models;
/*eslint-enable*/

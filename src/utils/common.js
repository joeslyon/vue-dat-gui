/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

const ARR_EACH = Array.prototype.forEach;
const ARR_SLICE = Array.prototype.slice;

/**
 * Band-aid methods for things that should be a lot easier in JavaScript.
 * Implementation and structure inspired by underscore.js
 * http://documentcloud.github.com/underscore/
 */

const Common = {
  BREAK: {},

  extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function(obj) {
      const keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function(key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);

    return target;
  },

  defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function(obj) {
      const keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function(key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);

    return target;
  },

  compose() {
    const toCall = ARR_SLICE.call(arguments);
    return function() {
      let args = ARR_SLICE.call(arguments);
      for (let i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },

  each(obj, itr, scope) {
    if (!obj) {
      return;
    }

    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) { // Is number but not NaN
      let key;
      let l;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (const key in obj) {
        if (itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    }
  },

  defer(fnc) {
    setTimeout(fnc, 0);
  },

  // if the function is called repeatedly, wait until threshold passes until we execute the function
  debounce(func, threshold, callImmediately) {
    let timeout;
    return function() {
      const obj = this;
      const args = arguments;

      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }

      const callNow = callImmediately || !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);

      if (callNow) {
        func.apply(obj, args);
      }
    };
  },

  toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },

  isUndefined(obj) {
    return obj === undefined;
  },

  isNull(obj) {
    return obj === null;
  },

  isNaN(obj) {
    return isNaN(obj);
  },

  isArray: Array.isArray || function(obj) {
    return obj.constructor === Array;
  },

  isObject(obj) {
    return obj === Object(obj);
  },

  isNumber(obj) {
    return obj === obj + 0;
  },

  isString(obj) {
    return obj === obj + '';
  },

  isBoolean(obj) {
    return obj === false || obj === true;
  },

  isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  },

  clamp(number, lower, upper) {
    if (upper === undefined) {
      upper = lower;
      lower = undefined;
    }
    if (upper !== undefined) {
      upper = this.toNumber(upper);
      upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
      lower = this.toNumber(lower);
      lower = lower === lower ? lower : 0;
    }
    return this.baseClamp(this.toNumber(number), lower, upper);
  },

  baseClamp(number, lower, upper) {
    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }
      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }
    return number;
  },

  toNumber(val) {
    const float = parseFloat(val);
    return isNaN(float) ? 0 : float;
  }
};

export default Common;

const dom = {
  bind: function(elem, event, func, newBool) {
    const bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent("on" + event, func);
    }
    return dom;
  },

  unbind: function(elem, event, func, newBool) {
    const bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent("on" + event, func);
    }
    return dom;
  },

  addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      const classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes
          .join(" ")
          .replace(/^\s+/, "")
          .replace(/\s+$/, "");
      }
    }
    return dom;
  },

  removeClass: function(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute("class");
      } else {
        const classes = elem.className.split(/ +/);
        const index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(" ");
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },

  hasClass: function(elem, className) {
    return (
      new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)").test(
        elem.className
      ) || false
    );
  }
};
export default dom;

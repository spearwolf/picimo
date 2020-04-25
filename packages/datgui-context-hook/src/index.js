/* eslint-disable react-hooks/exhaustive-deps */
import * as dat from 'dat.gui';
import PropTypes from 'prop-types';
import React, {useMemo, useState, useContext, useEffect, useRef} from 'react';

const DatGuiContext = React.createContext(undefined);

function DatGui({children, autoPlace, containerSelector}) {
  const datGui = useMemo(() => {
    const gui = new dat.GUI({autoPlace});
    if (!autoPlace && containerSelector) {
      document.querySelector(containerSelector)?.appendChild(gui.domElement);
    }
    return gui;
  }, [autoPlace, containerSelector]);

  return (
    <DatGuiContext.Provider value={datGui}>{children}</DatGuiContext.Provider>
  );
}

DatGui.propTypes = {
  children: PropTypes.node,
  autoPlace: PropTypes.bool,
  containerSelector: PropTypes.string,
};

DatGuiContext.defaultTypes = {
  autoPlace: true,
};

const $ctrl = Symbol('datGui.ctrl');
const $gui = Symbol('datGui.gui');
const $type = Symbol('datGui.type');
const $add = Symbol('datGui.add');

const CONSTRAINED_NUMBER = 'ConstrainedNumber';

class ContrainedNumber {
  constructor(value) {
    this.value = value;
    this[$type] = CONSTRAINED_NUMBER;
  }

  min(min) {
    this.min = min;
    return this;
  }

  max(max) {
    this.max = max;
    return this;
  }

  step(step) {
    this.step = step;
    return this;
  }

  [$add](datGui, ctx, name) {
    const {min, step, max} = this;
    let ctrl;
    if (typeof min === 'number' && typeof max === 'number') {
      ctrl = datGui.add(ctx, name, min, max);
    } else {
      ctrl = datGui.add(ctx, name);
      if (typeof min === 'number') {
        ctrl.min(min);
      }
      if (typeof max === 'number') {
        ctrl.max(max);
      }
    }
    if (typeof step === 'number') {
      ctrl.step(step);
    }
    return ctrl;
  }
}

const number = (...args) => new ContrainedNumber(...args);

function readInitialValue(obj, name) {
  const value = obj[name];
  if (typeof value === 'object') {
    if (value[$type] === CONSTRAINED_NUMBER) {
      return value.value;
    }
    if (Array.isArray(value)) {
      return value[0];
    }
    // object
    return Object.entries(value)[0][1];
  }
  return value;
}

function useDatGui(folder_, fields_) {
  const [folder, fields] =
    arguments.length === 1 ? [undefined, folder_] : [folder_, fields_];

  const guiObj = useRef({[$ctrl]: {}});
  const [props, setProps] = useState({});
  const rootGui = useContext(DatGuiContext);

  useEffect(() => {
    const {current} = guiObj;
    if (!current[$gui]) {
      current[$gui] = folder ? rootGui.addFolder(folder) : rootGui;
      const initialProps = Object.fromEntries(
        Object.keys(fields).map((name) => [
          name,
          readInitialValue(fields, name),
        ]),
      );
      setProps(initialProps);
    }
    const gui = current[$gui];
    Object.keys(fields)
      .filter(
        (name) => !(name in current) || typeof fields[name] === 'function',
      )
      .forEach((name) => {
        const value = readInitialValue(fields, name);
        current[name] = value;
        if (!current[$ctrl][name]) {
          const fieldValue = fields[name];
          const ctrl =
            typeof fieldValue === 'object'
              ? fieldValue[$add]
                ? fieldValue[$add](gui, current, name)
                : gui.add(current, name, fieldValue)
              : gui.add(current, name);
          current[$ctrl][name] = ctrl;
          if (typeof value !== 'function') {
            ctrl.onChange((val) => {
              setProps({...current, [name]: val});
            });
          }
        }
      });
    // TODO remove fields from datgui if they exists in guiObj but not in fields
  }, [fields, rootGui]);

  return props;
}

export {DatGui, useDatGui, number};

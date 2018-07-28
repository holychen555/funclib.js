import { FnType } from './modules/_Type';
import { FnArray } from './modules/_Array';
import { FnObject } from './modules/_Object';
import { FnString } from './modules/_String';
import { FnTime } from './modules/_Time';
import { FnRegExp } from './modules/_RegExp';
import { FnMath } from './modules/_Math';
import { FnFunction } from './modules/_Function';
import { FnUrl } from './modules/_Url';
import { FnCookie } from './modules/_Cookie';
import { FnDom } from './modules/_Dom';
import { FnLoger } from './modules/_Loger';
import { FnTrick } from './modules/_Trick';
import { VERSION, MAIN_METHODS } from './funclib.conf'

const fnModules = [
  FnType, FnArray, FnObject, FnString, FnTime, FnRegExp,
  FnMath, FnFunction, FnUrl, FnCookie, FnDom, FnTrick
] 

const methods = [...MAIN_METHODS,
  /* Dom */
  'fullScreen',
  'exitFullScreen',
  'isFullScreen',
  'fullScreenChange',
  'pollingEl',
  'noAutoComplete',
  /* Cookie */
  'setCookie',
  'getCookie',
  'removeCookie',
  /* Trick */
  'copyText',
];

var fn: any = function() {}

fnModules.forEach(fnModule => {
  FnObject.forIn(fnModule, (mtd, method) => {
    if (methods.indexOf(mtd) > -1) fn[mtd] = method;
  });
});

fn.version = VERSION;

fn.log = (value: any, configs: Object, isFmt: boolean) => {
  return FnLoger.log(true, value, configs, isFmt);
}

module.exports = fn;

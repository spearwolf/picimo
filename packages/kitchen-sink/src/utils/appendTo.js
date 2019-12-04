/* eslint-env browser */
export const appendTo = (select, postfix = '') => text => document.querySelector(select).innerHTML += `${text}${postfix}`.replace(/\n/g, '<br>');

import _ from 'lodash';
import { sayHello } from '~/Common/common';

export function init() {
  const x = _.join(['ASP', '.Net Core', 'MVC', 'Typescript'], ', ');
  console.log(sayHello(x));
}

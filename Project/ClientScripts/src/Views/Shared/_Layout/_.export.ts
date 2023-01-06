import { encodeBase64ToJson, sayHello } from '~/Common/common';

import { InitArgs } from './types';

export function init(args: string) {
  const { name } = encodeBase64ToJson<InitArgs>(args);

  sayHello(name);
}

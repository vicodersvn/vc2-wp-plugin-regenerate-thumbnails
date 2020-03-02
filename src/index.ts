import { Rule, chain } from '@angular-devkit/schematics';
import { common } from '@vicoders/cli-support';

export default function handler(): Rule {
  return chain([common.console.exec('vc2-wp plugin install regenerate-thumbnails')]);
}

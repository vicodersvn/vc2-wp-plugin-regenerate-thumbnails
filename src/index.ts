import { Rule, chain, apply, url, move, mergeWith, applyTemplates } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { WordpressService } from './services/Php/Wordpress/WordpressService';
import { App } from '@nsilly/container';
import { appendTo } from './utility/append-to-file/append-to-file';
import * as path from 'path';

export default function handler(options: any): Rule {
  const templateSource = apply(url('./files/slider'), [
    applyTemplates({
      ...strings,
      ...options
    }),
    move(options.path)
  ]);
  const block_script = path.resolve(process.cwd(), 'resources', 'assets', 'scripts', 'blocks', 'index.js');
  return chain([
    mergeWith(templateSource),
    App.make(WordpressService).declareInServiceProvider('app/Providers/BlockServiceProvider.php', `\\App\\Blocks\\SliderBlock\\SliderBlock::class,`),
    appendTo(block_script, 'import "./_vc2_slider_block";')
  ]);
}

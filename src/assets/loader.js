/**
 * Loads Components and Pages
 * */
import { HomePage } from './pages/index.js';
import { declarer, PageView, ImageCanvas } from './core/index.js';
import {
  DbCalc,
  DbRec,
} from './shared/index.js';



export const pages = [
  HomePage,
];

export const shared = [
  DbCalc,
  DbRec,
  PageView
]

export const registerComponents = (components) => {
  declarer(components)
}

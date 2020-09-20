import { technique, jutsus } from "./jutsus"
import "./style.scss"
import {check, ip, sc} from './store/'	
import { get, set } from 'svelte/store';
const footerLog: HTMLElement = document.querySelector("footer #logger")
const symbol : HTMLElement= document.querySelector("main .js-symbol")
const symbolDesc : HTMLElement= document.querySelector("main .js-symbol_desc")
import App from './components/App.svelte';

const app = new App({
  target: document.body,
  props: {
  } 
});

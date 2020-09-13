
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (store, interfaces) {
  'use strict';

  const jutsus = {
      "pynomy": {
          name: "Fire Element; Balsam Spread Fire",
          romanji: "Katon style: Hōsenka no Jutsu ",
          element: "Katon",
          kanji: "火遁・鳳仙火の術"
      },
      "yph": {
          name: "Fire Element; Fire Dragon Flame Missile",
          romanji: "Katon style: Karyūdan",
          element: "Katon",
          kanji: "火遁・火龍弾"
      },
      "yphy": {
          name: "Fire Element; Great Dragon Fire Technique",
          romanji: "Katon style: ",
          element: "Katon",
          kanji: "火遁"
      },
      "ypij": {
          name: "Fire Release: Exploding Flame Formation",
          romaji: "Katon: Kibaku Enjin",
          element: "katon",
          kanji: "火遁・起爆炎陣­"
      },
      "jlbuky": {
          name: "Fire Release: Great Fireball Technique",
          romaji: "Katon: Gōkakyū no Jutsu",
          element: "katon",
          kanji: "火遁・豪火球の術­­"
      },
      "yk": {
          name: "Fire Release: Great Blaze Ball",
          romaji: "Katon: Gōenkyū",
          element: "katon",
          kanji: "火遁・豪焔球­­"
      },
      "y": {
          name: "Fire Release: Flame Flower",
          romanji: "Katon: Enka",
          element: "Katon",
          kanji: "火遁・炎華",
          symbol: "🔥🌸"
      },
      "yi": {
          name: "Fire Release: Great Flame Flower",
          romanji: "Katon: Gōenka",
          element: "Katon",
          kanji: "火遁・豪炎華",
          symbol: ""
      },
      "yiuo": {
          name: "Fire Release: Phoenix Sage Fire Technique",
          romanji: "Katon: Hōsenka no Jutsu",
          element: "Katon",
          kanji: "火遁・鳳仙火の術"
      },
  };

  function noop() { }
  const identity = x => x;
  function add_location(element, file, line, column, char) {
      element.__svelte_meta = {
          loc: { file, line, column, char }
      };
  }
  function run(fn) {
      return fn();
  }
  function blank_object() {
      return Object.create(null);
  }
  function run_all(fns) {
      fns.forEach(run);
  }
  function is_function(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }
  function is_empty(obj) {
      return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
      if (store == null) {
          return noop;
      }
      const unsub = store.subscribe(...callbacks);
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }

  const is_client = typeof window !== 'undefined';
  let now = is_client
      ? () => window.performance.now()
      : () => Date.now();
  let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

  const tasks = new Set();
  function run_tasks(now) {
      tasks.forEach(task => {
          if (!task.c(now)) {
              tasks.delete(task);
              task.f();
          }
      });
      if (tasks.size !== 0)
          raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each raf frame
   * until it returns a falsy value or is aborted
   */
  function loop(callback) {
      let task;
      if (tasks.size === 0)
          raf(run_tasks);
      return {
          promise: new Promise(fulfill => {
              tasks.add(task = { c: callback, f: fulfill });
          }),
          abort() {
              tasks.delete(task);
          }
      };
  }

  function append(target, node) {
      target.appendChild(node);
  }
  function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
  }
  function detach(node) {
      node.parentNode.removeChild(node);
  }
  function element(name) {
      return document.createElement(name);
  }
  function text(data) {
      return document.createTextNode(data);
  }
  function space() {
      return text(' ');
  }
  function empty() {
      return text('');
  }
  function listen(node, event, handler, options) {
      node.addEventListener(event, handler, options);
      return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
          node.setAttribute(attribute, value);
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function set_input_value(input, value) {
      input.value = value == null ? '' : value;
  }
  function toggle_class(element, name, toggle) {
      element.classList[toggle ? 'add' : 'remove'](name);
  }
  function custom_event(type, detail) {
      const e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, false, false, detail);
      return e;
  }

  const active_docs = new Set();
  let active = 0;
  // https://github.com/darkskyapp/string-hash/blob/master/index.js
  function hash(str) {
      let hash = 5381;
      let i = str.length;
      while (i--)
          hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
      return hash >>> 0;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
      const step = 16.666 / duration;
      let keyframes = '{\n';
      for (let p = 0; p <= 1; p += step) {
          const t = a + (b - a) * ease(p);
          keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
      }
      const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
      const name = `__svelte_${hash(rule)}_${uid}`;
      const doc = node.ownerDocument;
      active_docs.add(doc);
      const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
      const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
      if (!current_rules[name]) {
          current_rules[name] = true;
          stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
      }
      const animation = node.style.animation || '';
      node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
      active += 1;
      return name;
  }
  function delete_rule(node, name) {
      const previous = (node.style.animation || '').split(', ');
      const next = previous.filter(name
          ? anim => anim.indexOf(name) < 0 // remove specific animation
          : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
      );
      const deleted = previous.length - next.length;
      if (deleted) {
          node.style.animation = next.join(', ');
          active -= deleted;
          if (!active)
              clear_rules();
      }
  }
  function clear_rules() {
      raf(() => {
          if (active)
              return;
          active_docs.forEach(doc => {
              const stylesheet = doc.__svelte_stylesheet;
              let i = stylesheet.cssRules.length;
              while (i--)
                  stylesheet.deleteRule(i);
              doc.__svelte_rules = {};
          });
          active_docs.clear();
      });
  }

  let current_component;
  function set_current_component(component) {
      current_component = component;
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
      if (!update_scheduled) {
          update_scheduled = true;
          resolved_promise.then(flush);
      }
  }
  function add_render_callback(fn) {
      render_callbacks.push(fn);
  }
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
      if (flushing)
          return;
      flushing = true;
      do {
          // first, call beforeUpdate functions
          // and update components
          for (let i = 0; i < dirty_components.length; i += 1) {
              const component = dirty_components[i];
              set_current_component(component);
              update(component.$$);
          }
          dirty_components.length = 0;
          while (binding_callbacks.length)
              binding_callbacks.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks.length; i += 1) {
              const callback = render_callbacks[i];
              if (!seen_callbacks.has(callback)) {
                  // ...so guard against infinite loops
                  seen_callbacks.add(callback);
                  callback();
              }
          }
          render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
          flush_callbacks.pop()();
      }
      update_scheduled = false;
      flushing = false;
      seen_callbacks.clear();
  }
  function update($$) {
      if ($$.fragment !== null) {
          $$.update();
          run_all($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);
          $$.after_update.forEach(add_render_callback);
      }
  }

  let promise;
  function wait() {
      if (!promise) {
          promise = Promise.resolve();
          promise.then(() => {
              promise = null;
          });
      }
      return promise;
  }
  function dispatch(node, direction, kind) {
      node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
  }
  const outroing = new Set();
  let outros;
  function group_outros() {
      outros = {
          r: 0,
          c: [],
          p: outros // parent group
      };
  }
  function check_outros() {
      if (!outros.r) {
          run_all(outros.c);
      }
      outros = outros.p;
  }
  function transition_in(block, local) {
      if (block && block.i) {
          outroing.delete(block);
          block.i(local);
      }
  }
  function transition_out(block, local, detach, callback) {
      if (block && block.o) {
          if (outroing.has(block))
              return;
          outroing.add(block);
          outros.c.push(() => {
              outroing.delete(block);
              if (callback) {
                  if (detach)
                      block.d(1);
                  callback();
              }
          });
          block.o(local);
      }
  }
  const null_transition = { duration: 0 };
  function create_bidirectional_transition(node, fn, params, intro) {
      let config = fn(node, params);
      let t = intro ? 0 : 1;
      let running_program = null;
      let pending_program = null;
      let animation_name = null;
      function clear_animation() {
          if (animation_name)
              delete_rule(node, animation_name);
      }
      function init(program, duration) {
          const d = program.b - t;
          duration *= Math.abs(d);
          return {
              a: t,
              b: program.b,
              d,
              duration,
              start: program.start,
              end: program.start + duration,
              group: program.group
          };
      }
      function go(b) {
          const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
          const program = {
              start: now() + delay,
              b
          };
          if (!b) {
              // @ts-ignore todo: improve typings
              program.group = outros;
              outros.r += 1;
          }
          if (running_program) {
              pending_program = program;
          }
          else {
              // if this is an intro, and there's a delay, we need to do
              // an initial tick and/or apply CSS animation immediately
              if (css) {
                  clear_animation();
                  animation_name = create_rule(node, t, b, duration, delay, easing, css);
              }
              if (b)
                  tick(0, 1);
              running_program = init(program, duration);
              add_render_callback(() => dispatch(node, b, 'start'));
              loop(now => {
                  if (pending_program && now > pending_program.start) {
                      running_program = init(pending_program, duration);
                      pending_program = null;
                      dispatch(node, running_program.b, 'start');
                      if (css) {
                          clear_animation();
                          animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                      }
                  }
                  if (running_program) {
                      if (now >= running_program.end) {
                          tick(t = running_program.b, 1 - t);
                          dispatch(node, running_program.b, 'end');
                          if (!pending_program) {
                              // we're done
                              if (running_program.b) {
                                  // intro — we can tidy up immediately
                                  clear_animation();
                              }
                              else {
                                  // outro — needs to be coordinated
                                  if (!--running_program.group.r)
                                      run_all(running_program.group.c);
                              }
                          }
                          running_program = null;
                      }
                      else if (now >= running_program.start) {
                          const p = now - running_program.start;
                          t = running_program.a + running_program.d * easing(p / running_program.duration);
                          tick(t, 1 - t);
                      }
                  }
                  return !!(running_program || pending_program);
              });
          }
      }
      return {
          run(b) {
              if (is_function(config)) {
                  wait().then(() => {
                      // @ts-ignore
                      config = config();
                      go(b);
                  });
              }
              else {
                  go(b);
              }
          },
          end() {
              clear_animation();
              running_program = pending_program = null;
          }
      };
  }
  function mount_component(component, target, anchor) {
      const { fragment, on_mount, on_destroy, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      // onMount happens before the initial afterUpdate
      add_render_callback(() => {
          const new_on_destroy = on_mount.map(run).filter(is_function);
          if (on_destroy) {
              on_destroy.push(...new_on_destroy);
          }
          else {
              // Edge case - component was destroyed immediately,
              // most likely as a result of a binding initialising
              run_all(new_on_destroy);
          }
          component.$$.on_mount = [];
      });
      after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
          run_all($$.on_destroy);
          $$.fragment && $$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          $$.on_destroy = $$.fragment = null;
          $$.ctx = [];
      }
  }
  function make_dirty(component, i) {
      if (component.$$.dirty[0] === -1) {
          dirty_components.push(component);
          schedule_update();
          component.$$.dirty.fill(0);
      }
      component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
  }
  function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component);
      const prop_values = options.props || {};
      const $$ = component.$$ = {
          fragment: null,
          ctx: null,
          // state
          props,
          update: noop,
          not_equal,
          bound: blank_object(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          before_update: [],
          after_update: [],
          context: new Map(parent_component ? parent_component.$$.context : []),
          // everything else
          callbacks: blank_object(),
          dirty,
          skip_bound: false
      };
      let ready = false;
      $$.ctx = instance
          ? instance(component, prop_values, (i, ret, ...rest) => {
              const value = rest.length ? rest[0] : ret;
              if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                  if (!$$.skip_bound && $$.bound[i])
                      $$.bound[i](value);
                  if (ready)
                      make_dirty(component, i);
              }
              return ret;
          })
          : [];
      $$.update();
      ready = true;
      run_all($$.before_update);
      // `false` as a special case of no DOM component
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options.target) {
          if (options.hydrate) {
              const nodes = children(options.target);
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.l(nodes);
              nodes.forEach(detach);
          }
          else {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.c();
          }
          if (options.intro)
              transition_in(component.$$.fragment);
          mount_component(component, options.target, options.anchor);
          flush();
      }
      set_current_component(parent_component);
  }
  class SvelteComponent {
      $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
      }
      $on(type, callback) {
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set($$props) {
          if (this.$$set && !is_empty($$props)) {
              this.$$.skip_bound = true;
              this.$$set($$props);
              this.$$.skip_bound = false;
          }
      }
  }

  function dispatch_dev(type, detail) {
      document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.1' }, detail)));
  }
  function append_dev(target, node) {
      dispatch_dev("SvelteDOMInsert", { target, node });
      append(target, node);
  }
  function insert_dev(target, node, anchor) {
      dispatch_dev("SvelteDOMInsert", { target, node, anchor });
      insert(target, node, anchor);
  }
  function detach_dev(node) {
      dispatch_dev("SvelteDOMRemove", { node });
      detach(node);
  }
  function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
      const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
      if (has_prevent_default)
          modifiers.push('preventDefault');
      if (has_stop_propagation)
          modifiers.push('stopPropagation');
      dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
      const dispose = listen(node, event, handler, options);
      return () => {
          dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
          dispose();
      };
  }
  function attr_dev(node, attribute, value) {
      attr(node, attribute, value);
      if (value == null)
          dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
      else
          dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
  }
  function validate_slots(name, slot, keys) {
      for (const slot_key of Object.keys(slot)) {
          if (!~keys.indexOf(slot_key)) {
              console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
          }
      }
  }
  class SvelteComponentDev extends SvelteComponent {
      constructor(options) {
          if (!options || (!options.target && !options.$$inline)) {
              throw new Error(`'target' is a required option`);
          }
          super();
      }
      $destroy() {
          super.$destroy();
          this.$destroy = () => {
              console.warn(`Component was already destroyed`); // eslint-disable-line no-console
          };
      }
      $capture_state() { }
      $inject_state() { }
  }

  const subscriber_queue = [];
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param {*=}value initial value
   * @param {StartStopNotifier=}start start and stop notifications for subscriptions
   */
  function writable(value, start = noop) {
      let stop;
      const subscribers = [];
      function set(new_value) {
          if (safe_not_equal(value, new_value)) {
              value = new_value;
              if (stop) { // store is ready
                  const run_queue = !subscriber_queue.length;
                  for (let i = 0; i < subscribers.length; i += 1) {
                      const s = subscribers[i];
                      s[1]();
                      subscriber_queue.push(s, value);
                  }
                  if (run_queue) {
                      for (let i = 0; i < subscriber_queue.length; i += 2) {
                          subscriber_queue[i][0](subscriber_queue[i + 1]);
                      }
                      subscriber_queue.length = 0;
                  }
              }
          }
      }
      function update(fn) {
          set(fn(value));
      }
      function subscribe(run, invalidate = noop) {
          const subscriber = [run, invalidate];
          subscribers.push(subscriber);
          if (subscribers.length === 1) {
              stop = start(set) || noop;
          }
          run(value);
          return () => {
              const index = subscribers.indexOf(subscriber);
              if (index !== -1) {
                  subscribers.splice(index, 1);
              }
              if (subscribers.length === 0) {
                  stop();
                  stop = null;
              }
          };
      }
      return { set, update, subscribe };
  }

  const ip = "10.10.1.104:3000";
  const ws = new WebSocket("ws://" + ip + "/21");

  function cubicOut(t) {
      const f = t - 1.0;
      return f * f * f + 1.0;
  }

  function fade(node, { delay = 0, duration = 400, easing = identity }) {
      const o = +getComputedStyle(node).opacity;
      return {
          delay,
          duration,
          easing,
          css: t => `opacity: ${t * o}`
      };
  }
  function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
      const style = getComputedStyle(node);
      const opacity = +style.opacity;
      const height = parseFloat(style.height);
      const padding_top = parseFloat(style.paddingTop);
      const padding_bottom = parseFloat(style.paddingBottom);
      const margin_top = parseFloat(style.marginTop);
      const margin_bottom = parseFloat(style.marginBottom);
      const border_top_width = parseFloat(style.borderTopWidth);
      const border_bottom_width = parseFloat(style.borderBottomWidth);
      return {
          delay,
          duration,
          easing,
          css: t => `overflow: hidden;` +
              `opacity: ${Math.min(t * 20, 1) * opacity};` +
              `height: ${t * height}px;` +
              `padding-top: ${t * padding_top}px;` +
              `padding-bottom: ${t * padding_bottom}px;` +
              `margin-top: ${t * margin_top}px;` +
              `margin-bottom: ${t * margin_bottom}px;` +
              `border-top-width: ${t * border_top_width}px;` +
              `border-bottom-width: ${t * border_bottom_width}px;`
      };
  }

  async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          // credentials: 'include', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "Accept": "application/json",
          },
          // redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
  }

  const ip$1 = "10.10.1.104:3000";
  const port = writable('101');
  const ws$1 = new WebSocket("ws://" + ip$1 + "/21");

  /* src\components\modal.svelte generated by Svelte v3.24.1 */
  const file = "src\\components\\modal.svelte";

  // (38:1) {#if check == true}
  function create_if_block(ctx) {
  	let dialog;
  	let h1;
  	let t1;
  	let t2;
  	let p;
  	let t4;
  	let input;
  	let t5;
  	let button;
  	let dialog_transition;
  	let current;
  	let mounted;
  	let dispose;
  	let if_block = localStorage && create_if_block_1(ctx);

  	const block = {
  		c: function create() {
  			dialog = element("dialog");
  			h1 = element("h1");
  			h1.textContent = "hENLO!";
  			t1 = space();
  			if (if_block) if_block.c();
  			t2 = space();
  			p = element("p");
  			p.textContent = "Select a server";
  			t4 = space();
  			input = element("input");
  			t5 = space();
  			button = element("button");
  			button.textContent = "accept";
  			add_location(h1, file, 39, 3, 861);
  			add_location(p, file, 43, 3, 992);
  			attr_dev(input, "type", "text");
  			attr_dev(input, "class", "svelte-s1wugr");
  			add_location(input, file, 44, 3, 1019);
  			add_location(button, file, 45, 3, 1066);
  			attr_dev(dialog, "id", "modal");
  			attr_dev(dialog, "class", "js-modal c-modal svelte-s1wugr");
  			toggle_class(dialog, "js-active", /*check*/ ctx[0]);
  			add_location(dialog, file, 38, 2, 738);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, dialog, anchor);
  			append_dev(dialog, h1);
  			append_dev(dialog, t1);
  			if (if_block) if_block.m(dialog, null);
  			append_dev(dialog, t2);
  			append_dev(dialog, p);
  			append_dev(dialog, t4);
  			append_dev(dialog, input);
  			set_input_value(input, /*data*/ ctx[1].text);
  			append_dev(dialog, t5);
  			append_dev(dialog, button);
  			current = true;

  			if (!mounted) {
  				dispose = [
  					listen_dev(input, "input", /*input_input_handler_1*/ ctx[4]),
  					listen_dev(button, "click", /*sendData*/ ctx[2], false, false, false)
  				];

  				mounted = true;
  			}
  		},
  		p: function update(ctx, dirty) {
  			if (localStorage) if_block.p(ctx, dirty);

  			if (dirty & /*data*/ 2 && input.value !== /*data*/ ctx[1].text) {
  				set_input_value(input, /*data*/ ctx[1].text);
  			}

  			if (dirty & /*check*/ 1) {
  				toggle_class(dialog, "js-active", /*check*/ ctx[0]);
  			}
  		},
  		i: function intro(local) {
  			if (current) return;

  			add_render_callback(() => {
  				if (!dialog_transition) dialog_transition = create_bidirectional_transition(dialog, slide, { delay: 1250, duration: 2200 }, true);
  				dialog_transition.run(1);
  			});

  			current = true;
  		},
  		o: function outro(local) {
  			if (!dialog_transition) dialog_transition = create_bidirectional_transition(dialog, slide, { delay: 1250, duration: 2200 }, false);
  			dialog_transition.run(0);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(dialog);
  			if (if_block) if_block.d();
  			if (detaching && dialog_transition) dialog_transition.end();
  			mounted = false;
  			run_all(dispose);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block.name,
  		type: "if",
  		source: "(38:1) {#if check == true}",
  		ctx
  	});

  	return block;
  }

  // (41:3) {#if localStorage}
  function create_if_block_1(ctx) {
  	let label;
  	let input;
  	let mounted;
  	let dispose;

  	const block = {
  		c: function create() {
  			label = element("label");
  			label.textContent = "Pick a name";
  			input = element("input");
  			attr_dev(label, "class", "svelte-s1wugr");
  			add_location(label, file, 41, 4, 905);
  			attr_dev(input, "type", "");
  			attr_dev(input, "name", "");
  			add_location(input, file, 41, 30, 931);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, label, anchor);
  			insert_dev(target, input, anchor);
  			set_input_value(input, /*data*/ ctx[1].name);

  			if (!mounted) {
  				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[3]);
  				mounted = true;
  			}
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*data*/ 2 && input.value !== /*data*/ ctx[1].name) {
  				set_input_value(input, /*data*/ ctx[1].name);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(label);
  			if (detaching) detach_dev(input);
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_1.name,
  		type: "if",
  		source: "(41:3) {#if localStorage}",
  		ctx
  	});

  	return block;
  }

  function create_fragment(ctx) {
  	let if_block_anchor;
  	let current;
  	let if_block = /*check*/ ctx[0] == true && create_if_block(ctx);

  	const block = {
  		c: function create() {
  			if (if_block) if_block.c();
  			if_block_anchor = empty();
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			if (if_block) if_block.m(target, anchor);
  			insert_dev(target, if_block_anchor, anchor);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			if (/*check*/ ctx[0] == true) {
  				if (if_block) {
  					if_block.p(ctx, dirty);

  					if (dirty & /*check*/ 1) {
  						transition_in(if_block, 1);
  					}
  				} else {
  					if_block = create_if_block(ctx);
  					if_block.c();
  					transition_in(if_block, 1);
  					if_block.m(if_block_anchor.parentNode, if_block_anchor);
  				}
  			} else if (if_block) {
  				group_outros();

  				transition_out(if_block, 1, 1, () => {
  					if_block = null;
  				});

  				check_outros();
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(if_block);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(if_block);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (if_block) if_block.d(detaching);
  			if (detaching) detach_dev(if_block_anchor);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance($$self, $$props, $$invalidate) {
  	let { check = false } = $$props;
  	let data = { text: "", name: "" };

  	function sendData(x) {
  		ws$1.send(JSON.stringify(data));
  	}

  	const writable_props = ["check"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Modal> was created with unknown prop '${key}'`);
  	});

  	let { $$slots = {}, $$scope } = $$props;
  	validate_slots("Modal", $$slots, []);

  	function input_input_handler() {
  		data.name = this.value;
  		$$invalidate(1, data);
  	}

  	function input_input_handler_1() {
  		data.text = this.value;
  		$$invalidate(1, data);
  	}

  	$$self.$$set = $$props => {
  		if ("check" in $$props) $$invalidate(0, check = $$props.check);
  	};

  	$$self.$capture_state = () => ({
  		slide,
  		fade,
  		ws: store.ws,
  		ip: store.ip,
  		port: store.port,
  		postData,
  		ws: ws$1,
  		ip: ip$1,
  		port,
  		check,
  		data,
  		sendData
  	});

  	$$self.$inject_state = $$props => {
  		if ("check" in $$props) $$invalidate(0, check = $$props.check);
  		if ("data" in $$props) $$invalidate(1, data = $$props.data);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		if ($$self.$$.dirty & /*check*/ 1) {
  			 console.log(check);
  		}
  	};

  	return [check, data, sendData, input_input_handler, input_input_handler_1];
  }

  class Modal extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init(this, options, instance, create_fragment, safe_not_equal, { check: 0 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Modal",
  			options,
  			id: create_fragment.name
  		});
  	}

  	get check() {
  		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set check(value) {
  		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  const footerLog = document.querySelector("footer #logger");
  const symbol = document.querySelector("main .js-symbol");
  const symbolDesc = document.querySelector("main .js-symbol_desc");
  let check = true;
  port.set(21);
  window.onload = e => {
      if (window.location.pathname === "/")
          check = true;
  };
  const app = new Modal({
      target: document.body,
      props: {
          check,
      }
  });
  if (!check) {
      //and the logic of the game
      ws.onmessage = x => console.warn(x.data);
      console.log(jutsus);
      let keyState = "";
      document.body.addEventListener("keydown", e => {
          footerLog.classList.add("is-logged");
          if ((/Enter/i).test(e.key)) {
              footerLog.innerText += "-" + e.key;
              showSymbol(jutsus[keyState]);
              ws.send(keyState);
              keyState = "";
          }
          else if ((/Backspace/i).test(e.key)) {
              keyState = keyState.slice(0, -1);
              footerLog.innerText = keyState;
          }
          else if ((/[a-z]/ig).test(e.key)) {
              keyState += e.key;
              footerLog.innerText = keyState;
          }
      });
      document.body.addEventListener("keyup", e => {
          if (e.key == "Enter")
              setTimeout(() => {
                  footerLog.classList.remove("is-logged");
                  footerLog.innerText = "";
              }, 2000);
      });
      function showSymbol(x) {
          if (x) {
              symbol.innerText = x.symbol;
              symbolDesc.querySelector("h1").innerText = x.kanji;
              symbolDesc.querySelector("h3 blockquote").innerText = x.romanji;
          }
          // else console.log(x)
      }
  }

}(store, interfaces));
//# sourceMappingURL=bundle.js.map

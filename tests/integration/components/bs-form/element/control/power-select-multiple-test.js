import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll } from 'ember-native-dom-helpers';
import { clickTrigger } from '../../../../../helpers/ember-power-select'

moduleForComponent('bs-form/element/control/power-select-multiple', 'Integration | Component | bs form/element/control/power select multiple', {
  integration: true,

  beforeEach() {
    this.set('options', ['foo', 'bar']);
    this.set('prop', ['foo']);
  }
});

test('it renders as blockless element', async function(assert) {
  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{form.element controlType="power-select-multiple" property="prop" options=options}}
  {{/bs-form}}`);
  assert.equal(findAll('.ember-power-select-trigger').length, 1);
  assert.equal(find('.ember-power-select-multiple-options').textContent.replace("×", "").trim(), 'foo');
  await clickTrigger();
  assert.equal(findAll('.ember-power-select-option').length, 2);
  assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
  assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
  await click(findAll('.ember-power-select-option')[1]);
  assert.deepEqual(this.get('prop'), ["foo", "bar"]);
});

test('it renders as blockless control component', async function(assert) {
  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{#form.element controlType="power-select-multiple" property="prop" options=options as |el|}}
      {{el.control}}
    {{/form.element}}
  {{/bs-form}}`);
  assert.equal(findAll('.ember-power-select-trigger').length, 1);
  assert.equal(find('.ember-power-select-multiple-option').textContent.replace("×", "").trim(), 'foo');
  await clickTrigger();
  assert.equal(findAll('.ember-power-select-option').length, 2);
  assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
  assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
  await click(findAll('.ember-power-select-option')[1]);
  assert.deepEqual(this.get('prop'), ["foo", "bar"]);
});

test('it renders as block control component', async function(assert) {
  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{#form.element controlType="power-select-multiple" property="prop" options=options as |el|}}
      {{#el.control as |val|}}
        {{val}}
      {{/el.control}} 
    {{/form.element}}
  {{/bs-form}}`);
  assert.equal(findAll('.ember-power-select-trigger').length, 1);
  assert.equal(find('.ember-power-select-multiple-option').textContent.replace("×", "").trim(), 'foo');
  await clickTrigger();
  assert.equal(findAll('.ember-power-select-option').length, 2);
  assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
  assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
  await click(findAll('.ember-power-select-option')[1]);
  assert.deepEqual(this.get('prop'), ["foo", "bar"]);
});

test('it renders placeholder', function(assert) {
  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{form.element controlType="power-select-multiple" property="prop2" options=options placeholder="something"}}
  {{/bs-form}}`);
  assert.equal(find('.ember-power-select-trigger-multiple-input').getAttribute("placeholder"), 'something');

  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{#form.element controlType="power-select-multiple" property="prop2" options=options placeholder="something" as |el|}}
      {{#el.control as |val|}}
        {{val}}
      {{/el.control}} 
    {{/form.element}}
  {{/bs-form}}`);
  assert.equal(find('.ember-power-select-trigger-multiple-input').getAttribute("placeholder"), 'something');
});

test('it can disable select', function(assert) {
  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{form.element controlType="power-select-multiple" property="prop" options=options disabled=true}}
  {{/bs-form}}`);
  assert.ok(find('.ember-power-select-trigger').getAttribute('aria-disabled'));

  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{#form.element controlType="power-select-multiple" property="prop" options=options disabled=true as |el|}}
      {{#el.control as |val|}}
        {{val}}
      {{/el.control}} 
    {{/form.element}}
  {{/bs-form}}`);
  assert.ok(find('.ember-power-select-trigger').getAttribute('aria-disabled'));
});

test('it can render array of objects with objectLabelPath', async function(assert) {
  this.set('options', this.get('options').map((title) => ({ title })));
  this.set('prop', [this.get('options')[0]]);
  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{form.element controlType="power-select-multiple" property="prop" options=options optionLabelPath="title"}}
  {{/bs-form}}`);
  assert.equal(findAll('.ember-power-select-trigger').length, 1);
  assert.equal(find('.ember-power-select-multiple-option').textContent.replace("×", "").trim(), 'foo');
  await clickTrigger();
  assert.equal(findAll('.ember-power-select-option').length, 2);
  assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
  assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
  await click(findAll('.ember-power-select-option')[1]);
  assert.deepEqual(this.get('prop'), this.get('options'));
});

test('it passes power-select options', async function(assert) {
  this.render(hbs`
  {{#bs-form model=this as |form|}}
    {{#form.element controlType="power-select-multiple" property="prop2" options=options placeholder="something" as |el|}}
      {{el.control searchEnabled=false}}
    {{/form.element}}
  {{/bs-form}}`);
  await clickTrigger();
  assert.notOk(find('.ember-power-select-search-input'));
});

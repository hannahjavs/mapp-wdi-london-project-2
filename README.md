# Project 3 Starter Code

When using this starter code, do NOT create an API constant. This will cause issues when deploying to Heroku.

Instead, simply prefix your AJAX requests with `/api`.

For example

```js
$http.get('/api/birds')
  .then(res => console.log(res));
```

Or with `ngResource`:

```js
$resource('/api/birds/:id', { id: '@id' }, {
  update: { method: 'PUT' }
});
```

## Team Members
Hannah

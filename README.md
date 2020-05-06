# Notion-js Mock Device


Really simple mock device for streaming raw brainwaves with notionjs.

```js
const notion = new Notion()

// the login function doesn't do anything
await notion.login({
  email:"email",
  password:"whatever"
})

// optional: set your own data file
notion.sourceData = [ ... ] // format: neurosity json export

// subscribe to the raw brainwaves
notion.brainwaves("raw").subscribe((raw) => {
  console.log('raw: ', raw);
});
```
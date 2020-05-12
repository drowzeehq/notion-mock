# Notion-js Mock Device


Really simple mock device for streaming raw brainwaves with notionjs.


```js
const { Notion } = require("@drowzee/notion-mock")

const notion = new Notion()

// the login function doesn't do anything
await notion.login({
  email:"email",
  password:"whatever"
})

// optional: set your own data file
notion.sourceData = [ ... ] // format: neurosity json export

// subscribe to the raw brainwaves like you are used to
notion.brainwaves("raw").subscribe((raw) => {
  console.log('raw: ', raw);
});
```

Supply your own data:

```js
const myRecording = require("./Obsidian chameleon.json")

// optional: set your own data file
notion.sourceData = myRecording // format: neurosity json export

```

TODO:

[] mock other parts of the api

[] not load the whole file into memory

const { Notion } = require("./index")

const test = async () => {
  const notion = new Notion()

  await notion.login({
    email:"email",
    password:"whatever"
  })
  
  notion.brainwaves("raw").subscribe((raw) => {
    console.log('raw: ', raw);
  });
}


test()
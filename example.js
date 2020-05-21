const { Notion } = require("./index");
const { map } = require("rxjs/operators")
const frequency = require("rxjs-frequency");

const test = async () => {
  const notion = new Notion();

  await notion.login({
    email: "email",
    password: "whatever",
  });

  // notion.brainwaves("raw").subscribe((raw) => {
  //   console.log("raw: ", raw);
  // });

  notion
    .brainwaves("raw")
    .pipe(
			map(a => a.data[0].length),
			frequency()
		)
    .subscribe((freq) => {
      console.log("freq: ", freq);
    });
};

test();

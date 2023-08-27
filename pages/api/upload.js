import multiparty from "multiparty";

export default async function handle(req, res) {
  const form = new multiparty.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log("length:", files);

  return res.json("ok");
}

export const config = {
  // think of config like a struct
  api: { bodyParser: false }, // set bodyParser in the api object to false
};

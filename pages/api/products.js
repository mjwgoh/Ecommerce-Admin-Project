import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) { // request and response
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }

    res.json(await Product.find());
  }

  if (method === "POST") {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({ title, description, price });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, _id } = req.body;
    await Product.updateOne({_id:_id}, {title:title, description:description, price:price});
    res.json(true); // unclear what this line does
  }

  if (method === "DELETE") {

    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }

  }

}

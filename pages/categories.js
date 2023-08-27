import Layout from "@/components/Layout";

export default function categories() {
  return (
    <Layout>
      <h1>Categories</h1>
      <label>Category name</label>

      <form className="flex gap-1">
        <input type="text" placeholder={"Category Name"}></input>
        <button type = {"submit"} className="btn-default">Save</button>
      </form>
    </Layout>
  );
}

import Pandabase from "@pandabase/node";

const pb = new Pandabase("YOUR_API_KEY", { sandbox: true });

async function main() {
  const shopClient = pb.shops("shop_");

  console.log(
    JSON.stringify(await shopClient.products.list({ page: 1, page_size: 10 }))
  );
}

main();

import Pandabase from "../index";

const pb = new Pandabase("api_key", { sandbox: true });

async function main() {
  const shopClient = pb.shops("shop_NJuPwmPcT1qUxA70KeL7lURyQ3");

  // Create a product
  const created = await shopClient.products.create({
    title: "Steam Giftcard",
    subtitle: "Instant $5 Steam Gift Card",
    description:
      " Steam Gift Cards work just like gift certificates, which can be redeemed on Steam for the purchase of games, software, hardware, and any other item you can purchase on Steam. ",
    price: 500,
    currency: "USD",
    type: "SERIAL",
    handle: "steam-giftcard-5",
  }); // a special created.product.serial_count property is also availble if product type is a serial

  // create a category
  await shopClient.categories.create({
    name: "Giftcards",
    handle: "gift-card",
    products: [created.product.id],
  });

  await shopClient.products.retrieveByHandle(created.product.handle);

  // Get product by id
  shopClient.products.retrieve(created.product.id);

  // update a product
  await shopClient.products.update(created.product.id, {
    title: "Edited Steam Giftcard",
  });

  // List products
  const listedResponse = await shopClient.products.list({
    page: 1,
    page_size: 10,
  });

  console.log(listedResponse);

  // Delete products
  for (const product of listedResponse.products) {
    await shopClient.products.delete(product.id);
  }
}

main();

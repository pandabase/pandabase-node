import Pandabase from "..";

const shops = new Pandabase("tok_", { max_retries: 5 }).shops("shop_");

(async () => {
  const coupons = await shops.coupons.list();

  console.log(coupons);
})();

import Header from "@/components/Header";
import FeaturedProducts from "@/components/Featured";
import { Product } from "@/models/productModel";
import { mongooseConnect } from "@/lib/mongoos";
import { Featured } from "@/models/featuredModel";

export default function HomePage({featuredProducts,newProducts}) {
  return (
    <div className="text-white">
        <FeaturedProducts products={featuredProducts}/>
    </div>
  );
}

export async function getServerSideProps() {
	await mongooseConnect();
	let resultfind = await Featured.find()
	let result = await resultfind.map(({ _id }) => _id)
	const featuredProduct = await Product.find({'_id': { $in: result }});
	const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
	return {
		props: {
			featuredProducts: JSON.parse(JSON.stringify(featuredProduct)),
			newProducts: JSON.parse(JSON.stringify(newProducts)),
		},
	};
}
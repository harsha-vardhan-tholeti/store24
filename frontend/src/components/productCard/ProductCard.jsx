import macbook from "../../images/macbook.jpg";

const ProductCard = () => {
  return (
    <div className="bg-white h-full m-4 rounded-2xl">
      <img className="rounded-t-2xl" src={macbook} alt="" />
      <div className="text-center my-4 px-6">
        <p>Apple Mac</p>
        <div className="flex justify-center my-4">
          <p className="mr-2">⭐⭐⭐⭐⭐</p>
          <p>(200 reviews)</p>
        </div>
        <p>$200</p>
      </div>
    </div>
  );
};

export default ProductCard;

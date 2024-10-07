import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ProductWithQuantity } from "@/types/cart/cart";
import { Product } from "@/types/home/home";
import clsx from "clsx";

interface HomeProductProps {
  product: Product;
  onModalClick?: (elem: Product) => void;
  onAddToCartClick?: (elem: ProductWithQuantity) => void;
  isModal?: boolean;
}

const HomeProduct = (props: HomeProductProps) => {
  const { product, onModalClick, onAddToCartClick, isModal } = props;
  const { title, description, price, images, brand, rating, tags } = product;
  const [defaultImage] = images;

  return (
    <Card
      className={clsx(
        "h-full rounded-lg shadow-none border-0 duration-200",
        {
          "border border-gray-200 shadow-lg hover:shadow-xl": !isModal,
        },
      )}
    >
      <div className={clsx("w-auto h-[200px] bg-gray-100 flex items-center justify-center", {
        "w-full h-[300px]": !isModal
      })}>
        <img
          src={defaultImage}
          alt={title}
          className="w-full h-full object-contain p-4"
        />
      </div>

      <div
        className={clsx("py-4", {
          "px-6 flex flex-col justify-center items-center": !isModal,
        })}
      >
        <CardTitle className="font-bold max-w-[180px] overflow-ellipsis text-lg text-gray-800 mb-2 min-h-14 line-clamp-2">
          {title}
        </CardTitle>

        <CardContent
          className={clsx("text-gray-600 text-sm mb-4 text-left pl-0 pb-0", {
            "line-clamp-3 pb-0 text-center": !isModal,
          })}
        >
          {isModal && (
            <div className="flex flex-col gap-4 mb-4">
              <p>
                <span className="font-semibold">Brand: </span>
                <span>{brand ?? "None"}</span>
              </p>
              <p>
                <span className="font-semibold">Rating: </span>
                <span>{rating}</span>
              </p>
              <p className="flex flex-col">
                <span className="font-semibold">Description: </span>
                <span>{description}</span>
              </p>
              <p>
                <span className="font-semibold">Price: </span>
                <span>${price}</span>
              </p>
              <div>
                <p className="font-semibold">Tags: </p>
                <div className="flex flex-wrap gap-2 mt-2">{tags.map((tag) => <Badge>{tag}</Badge>)}</div>
              </div>
            </div>
          )}
        </CardContent>

        {!isModal && <div className="text-lg font-semibold text-gray-800 mb-4">${price}</div>}
      </div>

      <CardFooter
        className={clsx(
          "flex px-0 flex-col gap-4 lg:flex-row justify-between items-center py-4",
          {
            "px-6 border-t border-gray-200": !isModal,
          }
        )}
      >
        {!isModal && (
          <Button
            className="text-white w-full lg:w-auto lg:flex-grow bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            onClick={() => onModalClick?.(product)}
          >
            More Info
          </Button>
        )}

        <Button className="text-white w-full lg:w-auto lg:flex-grow bg-green-500 hover:bg-green-600 font-semibold px-4 py-2 rounded-lg transition-colors duration-200" onClick={() => onAddToCartClick?.({...product, quantity: 1})}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomeProduct;

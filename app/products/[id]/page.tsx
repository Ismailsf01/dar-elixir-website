import ProductDetailsClient from "./ProductDetailsClient"

// This Server Component just passes the ID to the Client Component
export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <ProductDetailsClient id={params.id} />
  );
}
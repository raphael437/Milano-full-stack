import Product from '@/components/Product';

type PageProps = {
  params: Promise<{
    productid: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { productid } = await params;

  return <Product id={productid} />;
}
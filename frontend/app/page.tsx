import BestSelling from '@/components/BestSelling';
import Cta from '@/components/Cta';
import FeatureBox from '@/components/FeatureBox';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Logos from '@/components/Logos';
import Main from '@/components/Main';
import MayLike from '@/components/MayLike';
import NewArrivals from '@/components/newArrivals';
import ShopNewCollection from '@/components/ShopCollection';
import Testimonials from '@/components/Testimonials ';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-black">
      <Main />
      <FeatureBox/>
      <NewArrivals/>
      <ShopNewCollection/>
      <BestSelling/>
      <Testimonials/>
      <MayLike/>
      <Logos/>
      <Cta/>
      <Footer/>
    </div>
  );
}

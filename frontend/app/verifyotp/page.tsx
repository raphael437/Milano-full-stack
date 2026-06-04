import { Suspense } from "react";

import VerifyOtpPage from "@/components/verifyOtp";

export default function Page(){
     return (
    <Suspense fallback={<div>Loading...</div>}>
       <VerifyOtpPage/>
    </Suspense>
  );

        
}

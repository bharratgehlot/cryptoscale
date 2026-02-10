import { useRouter } from "next/router";

export default function CoinPage(){
   const router = useRouter();
   const { id } = router.query;

  return (
    <main className="container mx-auto p-4" >
      <h1 className="text-xl font-semibold">
        Coin ID: {id}
      </h1>
    </main>
  )
}
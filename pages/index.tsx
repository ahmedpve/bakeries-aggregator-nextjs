import BakeriesDirectory from "@/components/bakeries-directory/bakeries-directory";
import { Bakery } from "@/models/Bakery";
import { Center, Spinner, chakra } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import useSWR from "swr";

const getBakeriesFetcher = async (path: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const res = await axios({ method: "GET", url });
  return res.data.data.bakeries;
};

export default function HomePage() {
  const { data: bakeries, error, isLoading } = useSWR("/bakeries", getBakeriesFetcher);

  if (isLoading && !bakeries) {
    return (
      <Center mt="16">
        <Spinner color="primary.500" />
      </Center>
    );
  }

  const adjustedBakeries: (Bakery & { categories: string[] })[] = bakeries.map((b: Bakery) => {
    const categories: Record<string, string> = {};
    b.products.map((p) => {
      if (!categories[p.category]) {
        categories[p.category] = p.category;
      }
      return p;
    });
    return { ...b, categories: Object.values(categories) };
  });

  const allCategoriesFound: string[] = [];
  adjustedBakeries.forEach((b) => allCategoriesFound.push(...b.categories));
  const categories = Array.from(new Set(allCategoriesFound));

  return (
    <>
      <Head>
        <title>Bakeries Aggregator</title>
      </Head>

      <chakra.section maxW="container.lg" mx="auto" my="4">
        <BakeriesDirectory bakeries={adjustedBakeries} categories={categories} />
      </chakra.section>
    </>
  );
}

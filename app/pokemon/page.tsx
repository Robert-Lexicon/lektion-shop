import PaginationNav from "@/components/navigation/pagination";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFromAPI } from "@/data-access/pokeapi";
import { PokeResultList } from "@/lib/interfaces";
import { parseQueryParam } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const POKEAPI_URL = "https://pokeapi.co/api/v2/";

export const metadata: Metadata = {
  title: "Pokemon listing",
  description: "Pokemon list from the pokeapi",
};

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; //this is default what could be in searchParams
}) {
  //Destructure searchParams and parse them
  const { offset, limit } = await searchParams;
  const parsedOffset = parseQueryParam(offset, 0);
  const parsedLimit = parseQueryParam(limit, 10);

  //fetch the data from the api using the endpoint and the interface stated at the start of the this code
  //TODO: We could maybe make the search params dynamically here instead of hard coding them
  const data = await fetchFromAPI<PokeResultList>(
    `${POKEAPI_URL}/pokemon?limit=${parsedLimit}&offset=${parsedOffset}`
  );

  //if there is a message in data it means error, so display that and nothing else
  if ("message" in data) {
    console.log("Error fetching data:", data.message);
    return <div>Error: {data.message}</div>;
  }

  //if no message then everything is ok, so we can output our data
  //TODO: Refactor out the card and use Suspense to show loading spinner or such
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-4 mx-4 my-8">
        {
          //TODO: Show something nice if we don't get any data
          data.results.map((r) => (
            <li key={r.name}>
              <Link href={`pokemon/${r.name}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <h2 className="text-center">
                        <span className="capitalize">{r.name}</span>
                      </h2>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))
        }
      </ul>
      <PaginationNav
        path={"pokemon"}
        pagesCount={data.count}
        limit={parsedLimit}
        offset={parsedOffset}
      />
    </>
  );
}
